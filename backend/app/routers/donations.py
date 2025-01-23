# app/routers/donations.py

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import and_, or_
from datetime import datetime
from ..models import models, schemas
from ..utils.dependencies import get_db
from ..services.nfc_service import NFCService
from typing import List, Optional


router = APIRouter()
nfc_service = NFCService()

@router.get("/", response_model=List[schemas.Donation])
def get_donations(
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None),
    amount_min: Optional[float] = Query(None),
    amount_max: Optional[float] = Query(None),
    donor_name: Optional[str] = Query(None),
    nfc_reader_location: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(models.Donation).join(models.Donor).join(models.NFCReader)

    filters = []
    if start_date:
        filters.append(models.Donation.date >= start_date)
    if end_date:
        filters.append(models.Donation.date <= end_date)
    if amount_min is not None:
        filters.append(models.Donation.amount >= amount_min)
    if amount_max is not None:
        filters.append(models.Donation.amount <= amount_max)
    if donor_name:
        filters.append(models.Donor.name.ilike(f"%{donor_name}%"))
    if nfc_reader_location:
        filters.append(models.NFCReader.location.ilike(f"%{nfc_reader_location}%"))

    if filters:
        query = query.filter(and_(*filters))

    donations = query.options(
        joinedload(models.Donation.donor),
        joinedload(models.Donation.nfc_reader)
    ).all()
    return donations


@router.post("/from_nfc", response_model=schemas.Donation)
def create_donation_from_nfc(db: Session = Depends(get_db)):
    data = nfc_service.read_data()
    donor_name = data['donor_name']
    amount = data['amount']
    nfc_reader_id = data['nfc_reader_id']

    # Check if donor exists
    donor = db.query(models.Donor).filter(models.Donor.name == donor_name).first()
    if not donor:
        # Create new donor
        donor = models.Donor(name=donor_name)
        db.add(donor)
        db.commit()
        db.refresh(donor)

    # Create donation
    donation = models.Donation(
        donor_id=donor.id,
        amount=amount,
        nfc_reader_id=nfc_reader_id
    )
    db.add(donation)
    db.commit()
    db.refresh(donation)
    return donation

@router.post("/", response_model=schemas.Donation)
def create_donation(donation: schemas.DonationCreate, db: Session = Depends(get_db)):
    db_donation = models.Donation(
        donor_id=donation.donor_id,
        amount=donation.amount,
        nfc_reader_id=donation.nfc_reader_id
    )
    db.add(db_donation)
    db.commit()
    db.refresh(db_donation)
    return db_donation


@router.post("/{donation_id}/refund", response_model=schemas.Refund)
def refund_donation(donation_id: int, db: Session = Depends(get_db)):
    donation = db.query(models.Donation).filter(models.Donation.id == donation_id).first()
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")

    # For simplicity, refund the full amount
    refund = models.Refund(
        donation_id=donation_id,
        amount=donation.amount
    )

    # Update the donation amount to zero or mark as refunded
    donation.amount = 0  # Or add a 'refunded' boolean field

    db.add(refund)
    db.commit()
    db.refresh(refund)
    return refund


# backend/app/routers/analytics.py

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from ..models import models
from ..utils.dependencies import get_db
from typing import Optional

router = APIRouter()

@router.get("/total_donations")
def get_total_donations(
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None),
    nfc_reader_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(
        func.date(models.Donation.date).label('date'),
        func.sum(models.Donation.amount).label('total_donations')
    )

    if nfc_reader_id:
        query = query.filter(models.Donation.nfc_reader_id == nfc_reader_id)
    if start_date:
        query = query.filter(models.Donation.date >= start_date)
    if end_date:
        query = query.filter(models.Donation.date <= end_date)

    query = query.group_by(func.date(models.Donation.date))
    results = query.all()

    results = sorted(results, key=lambda x: x.date) #Sorts results based off of date

    data = [{"date": result.date.strftime("%Y-%m-%d"), "total_donations": result.total_donations} for result in results]

    return data

@router.get("/transactions_by_location")
def get_transactions_by_location(db: Session = Depends(get_db)):
    results = (
        db.query(models.NFCReader.location, func.count(models.Donation.id))
        .join(models.Donation)
        .group_by(models.NFCReader.location)
        .all()
    )
    data = [{"location": location, "count": count} for location, count in results]
    return data

@router.get("/revenue_by_location")
def get_revenue_by_location(db: Session = Depends(get_db)):
    results = (
        db.query(models.NFCReader.location, func.sum(models.Donation.amount))
        .join(models.Donation)
        .group_by(models.NFCReader.location)
        .all()
    )
    data = [{"location": location, "revenue": revenue} for location, revenue in results]
    return data

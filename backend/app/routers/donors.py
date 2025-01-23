# app/routers/donors.py

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..models import models, schemas
from ..utils.dependencies import get_db
from typing import Optional, List

router = APIRouter()

@router.get("/", response_model=List[schemas.Donor])
def get_donors(
    name: Optional[str] = Query(None),
    min_donations: Optional[int] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(models.Donor)

    if name:
        query = query.filter(models.Donor.name.ilike(f"%{name}%"))

    if min_donations is not None:
        query = query.join(models.Donation).group_by(models.Donor.id).having(
            func.count(models.Donation.id) >= min_donations
        )

    donors = query.all()
    return donors

@router.post("/", response_model=schemas.Donor)
def create_donor(donor: schemas.DonorCreate, db: Session = Depends(get_db)):
    db_donor = models.Donor(name=donor.name)
    db.add(db_donor)
    db.commit()
    db.refresh(db_donor)
    return db_donor

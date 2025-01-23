# app/routers/nfc_readers.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import models, schemas
from ..utils.dependencies import get_db

router = APIRouter()

@router.get("/", response_model=list[schemas.NFCReader])
def get_nfc_readers(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    nfc_readers = db.query(models.NFCReader).offset(skip).limit(limit).all()
    return nfc_readers

@router.post("/", response_model=schemas.NFCReader)
def create_nfc_reader(nfc_reader: schemas.NFCReaderCreate, db: Session = Depends(get_db)):
    db_nfc_reader = models.NFCReader(
        location=nfc_reader.location,
        assigned_fundraiser_id=nfc_reader.assigned_fundraiser_id
    )
    db.add(db_nfc_reader)
    db.commit()
    db.refresh(db_nfc_reader)
    return db_nfc_reader

@router.put("/{nfc_reader_id}", response_model=schemas.NFCReader)
def update_nfc_reader(nfc_reader_id: int, nfc_reader: schemas.NFCReaderCreate, db: Session = Depends(get_db)):
    db_reader = db.query(models.NFCReader).filter(models.NFCReader.id == nfc_reader_id).first()
    if not db_reader:
        raise HTTPException(status_code=404, detail="NFC Reader not found")
    db_reader.location = nfc_reader.location
    db_reader.assigned_fundraiser_id = nfc_reader.assigned_fundraiser_id
    db.commit()
    db.refresh(db_reader)
    return db_reader

@router.delete("/{nfc_reader_id}")
def delete_nfc_reader(nfc_reader_id: int, db: Session = Depends(get_db)):
    db_reader = db.query(models.NFCReader).filter(models.NFCReader.id == nfc_reader_id).first()
    if not db_reader:
        raise HTTPException(status_code=404, detail="NFC Reader not found")
    db.delete(db_reader)
    db.commit()
    return {"message": "NFC Reader deleted successfully"}


# app/models/schemas.py

from pydantic import BaseModel
from typing import Optional
import datetime

class DonorBase(BaseModel):
    name: str

class DonorCreate(DonorBase):
    pass

class Donor(DonorBase):
    id: int

    class Config:
        from_attributes = True

class DonationBase(BaseModel):
    donor_id: int
    amount: float
    nfc_reader_id: int

class DonationCreate(DonationBase):
    pass


class NFCReaderBase(BaseModel):
    location: str
    assigned_fundraiser_id: Optional[int]

class NFCReaderCreate(NFCReaderBase):
    pass

class NFCReader(NFCReaderBase):
    id: int

    class Config:
        from_attributes = True


class Donation(DonationBase):
    id: int
    date: datetime.datetime
    nfc_reader_id: int
    donor: Donor
    nfc_reader: NFCReader

    class Config:
        from_attributes = True


class RefundBase(BaseModel):
    donation_id: int
    amount: float

class RefundCreate(RefundBase):
    pass

class Refund(RefundBase):
    id: int
    date: datetime.datetime

    class Config:
        from_attributes = True

class FundraiserBase(BaseModel):
    name: str
    goal_amount: float
    start_date: datetime.datetime
    end_date: datetime.datetime

class Fundraiser(FundraiserBase):
    id: int
    current_amount: float

    class Config:
        from_attributes = True
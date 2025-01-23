# app/models/models.py

from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from ..db import Base
import datetime

class Donor(Base):
    __tablename__ = 'donors'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    # Add other fields if necessary

    donations = relationship("Donation", back_populates="donor")


class Refund(Base):
    __tablename__ = 'refunds'

    id = Column(Integer, primary_key=True, index=True)
    donation_id = Column(Integer, ForeignKey('donations.id'))
    amount = Column(Float)
    date = Column(DateTime, default=datetime.datetime.utcnow)

    donation = relationship("Donation", back_populates="refunds")


class Donation(Base):
    __tablename__ = 'donations'

    id = Column(Integer, primary_key=True, index=True)
    donor_id = Column(Integer, ForeignKey('donors.id'))
    amount = Column(Float)
    date = Column(DateTime, default=datetime.datetime.utcnow)
    nfc_reader_id = Column(Integer, ForeignKey('nfc_readers.id'))

    donor = relationship("Donor", back_populates="donations")
    nfc_reader = relationship("NFCReader", back_populates="donations")
    refunds = relationship("Refund", back_populates="donation")

class NFCReader(Base):
    __tablename__ = 'nfc_readers'

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String)
    assigned_fundraiser_id = Column(Integer, ForeignKey('fundraisers.id'))

    donations = relationship("Donation", back_populates="nfc_reader")
    fundraiser = relationship("Fundraiser", back_populates="nfc_readers")

class Fundraiser(Base):
    __tablename__ = 'fundraisers'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    goal_amount = Column(Float)
    current_amount = Column(Float, default=0.0)
    start_date = Column(DateTime)
    end_date = Column(DateTime)

    nfc_readers = relationship("NFCReader", back_populates="fundraiser")

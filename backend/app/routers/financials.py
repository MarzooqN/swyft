# backend/app/routers/financials.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..models import models
from ..utils.dependencies import get_db

router = APIRouter()

@router.get("/overview")
def get_financial_overview(db: Session = Depends(get_db)):
    total_donations = db.query(func.sum(models.Donation.amount)).scalar() or 0
    total_refunds = db.query(func.sum(models.Refund.amount)).scalar() or 0
    total_transactions = db.query(func.count(models.Donation.id)).scalar() or 0
    total_fundraisers = db.query(func.count(models.Fundraiser.id)).scalar() or 0
    net_amount = total_donations - total_refunds

    # Assume a fixed transaction fee rate (e.g., 2.9% + $0.30)
    transaction_fee_rate = 0.029
    transaction_fee_fixed = 0.30

    total_fees = (total_donations * transaction_fee_rate) + (transaction_fee_fixed * total_transactions)
    amount_available = net_amount - total_fees

    return {
        "total_donations": total_donations,
        "total_refunds": total_refunds,
        "total_transactions": total_transactions,
        "total_fundraisers": total_fundraisers,
        "net_amount": net_amount,
        "total_fees": total_fees,
        "amount_available": amount_available,
    }

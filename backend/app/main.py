# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Donation Dashboard API")

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with your frontend's origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers...
from .routers import donors, donations, nfc_readers, analytics, financials
app.include_router(donors.router, prefix="/donors", tags=["Donors"])
app.include_router(donations.router, prefix="/donations", tags=["Donations"])
app.include_router(nfc_readers.router, prefix="/nfc_readers", tags=["NFC Readers"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"] )
app.include_router(financials.router, prefix="/financials", tags=["Financials"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Donation Dashboard API"}

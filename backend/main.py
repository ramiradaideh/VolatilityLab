from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.api.backtest import router as backtest_router

import os

# Load environment variables
load_dotenv()

app = FastAPI(
    title="VolatilityLab API",
    description="API for quantum trading strategy backtesting",
    version="1.0.0"
)
# This will include the backtest router where we define our endpoints
app.include_router(backtest_router, prefix="/backtest")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to VolatilityLab API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 

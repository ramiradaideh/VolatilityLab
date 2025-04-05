from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, List
from datetime import datetime
from ..services.polygon_service import PolygonService
from ..services.backtest_service import BacktestService

router = APIRouter()
polygon_service = PolygonService()
backtest_service = BacktestService()

class BacktestRequest(BaseModel):
    symbol: str
    strategy_name: str
    start_date: datetime
    end_date: datetime
    parameters: Dict[str, Any] = {}

class BacktestResponse(BaseModel):
    symbol: str
    strategy_name: str
    total_return: float
    sharpe_ratio: float
    max_drawdown: float
    signals: List[float]
    equity_curve: List[float]

@router.post("/run", response_model=BacktestResponse)
async def run_backtest(request: BacktestRequest):
    """
    Run a backtest for a given symbol and strategy
    """
    try:
        # Fetch historical data
        data = polygon_service.get_stock_data(
            request.symbol,
            request.start_date,
            request.end_date
        )
        
        if not data:
            raise HTTPException(
                status_code=404,
                detail=f"No data found for symbol {request.symbol}"
            )

        # Run backtest
        results = backtest_service.run_backtest(
            data,
            request.strategy_name,
            request.parameters
        )

        return BacktestResponse(
            symbol=request.symbol,
            strategy_name=request.strategy_name,
            **results
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.get("/strategies")
async def get_available_strategies():
    """
    Get list of available strategies
    """
    return {
        "strategies": list(backtest_service.strategies.keys())
    } 
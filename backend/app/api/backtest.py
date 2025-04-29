from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, List
from datetime import datetime
from ..services.polygon_service import PolygonService
from ..services.backtest_service import BacktestService
import logging

logger = logging.getLogger(__name__)

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
    strategy_display_name: str
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
        logger.info(f"Starting backtest for {request.symbol} with strategy {request.strategy_name}")
        
        # Fetch historical data
        data = polygon_service.get_stock_data(
            request.symbol,
            request.start_date,
            request.end_date
        )
        
        if not data:
            logger.error(f"No data found for symbol {request.symbol} between {request.start_date} and {request.end_date}")
            raise HTTPException(
                status_code=404,
                detail=f"No data found for symbol {request.symbol} between {request.start_date} and {request.end_date}"
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
            strategy_display_name=results["strategy_display_name"],
            total_return=results["total_return"],
            sharpe_ratio=results["sharpe_ratio"],
            max_drawdown=results["max_drawdown"],
            signals=results["signals"],
            equity_curve=results["equity_curve"],
        )

    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.exception("Unexpected error during backtest")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/strategies")
async def get_available_strategies():
    """
    Get list of available strategies with their display names
    """
    return {
        "strategies": backtest_service.get_all_strategies()
    } 

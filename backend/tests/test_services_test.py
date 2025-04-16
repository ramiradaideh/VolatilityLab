from datetime import datetime, timedelta
import sys
import os
import pandas as pd
import numpy as np
import statsmodels.api as sm
from typing import Dict, Any
from app.services.polygon_service import PolygonService
from app.services.backtest_service import BacktestService

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# from app.services.polygon_service import PolygonService
# from app.services.backtest_service import BacktestService


def test_backtest_strategy():
    """Test the backtest strategy implementation"""
    # Initialize services
    polygon_service = PolygonService()
    backtest_service = BacktestService()

    # Test parameters
    symbol = "COIN" 
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365)  # 1 year of data

    print(f"\nTesting Polygon.io service for {symbol}...")
    # Get stock data
    data = polygon_service.get_stock_data(symbol, start_date, end_date)
    print(f"Retrieved {len(data)} days of data")

    if data:
        print("\nTesting backtest service...")
        # Test both strategies
        strategies = [
            ("momentum_regression", {
                "short_sma": 5,
                "mid_sma": 20,
                "long_sma": 60,
                "regression_window": 30
            })
        ]

        for strategy_name, params in strategies:
            print(f"\nRunning {strategy_name}...")
            results = backtest_service.run_backtest(
                data,
                strategy_name,
                parameters=params
            )

            print(f"Results for {strategy_name}:")
            print(f"Total Return: {results['total_return']:.2%}")
            print(f"Sharpe Ratio: {results['sharpe_ratio']:.2f}")
            print(f"Max Drawdown: {results['max_drawdown']:.2%}")
            
            # Add assertions to verify results
            assert 'total_return' in results
            assert 'sharpe_ratio' in results
            assert 'max_drawdown' in results
            assert isinstance(results['total_return'], float)
            assert isinstance(results['sharpe_ratio'], float)
            assert isinstance(results['max_drawdown'], float)

if __name__ == "__main__":
    # This will still allow running the file directly with python if needed
    test_backtest_strategy() 

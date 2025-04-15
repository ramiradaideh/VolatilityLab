from datetime import datetime, timedelta
from app.services.polygon_service import PolygonService
from app.services.backtest_service import BacktestService

def test_services():
    # Initialize services
    polygon_service = PolygonService()
    backtest_service = BacktestService()

    # Test parameters
    symbol = "AAPL"  # Apple stock
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365)  # 1 year of data

    print(f"Testing Polygon.io service for {symbol}...")
    # Get stock data
    data = polygon_service.get_stock_data(symbol, start_date, end_date)
    print(f"Retrieved {len(data)} days of data")

    if data:
        print("\nTesting backtest service...")
        # Test both strategies
    strategies = [
        ("momentum_regression", {
            "short_sma": 5,
            "mid_sma": 252,
            "long_sma": 1260,
            "regression_window": 252
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


if __name__ == "__main__":
    test_services() 

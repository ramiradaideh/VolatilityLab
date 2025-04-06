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
        strategies = ["simple_moving_average", "rsi_strategy"]
        
        for strategy in strategies:
            print(f"\nRunning {strategy}...")
            results = backtest_service.run_backtest(
                data,
                strategy,
                parameters={
                    "short_window": 20,
                    "long_window": 50,
                    "period": 14,
                    "overbought": 70,
                    "oversold": 30
                }
            )
            
            print(f"Results for {strategy}:")
            print(f"Total Return: {results['total_return']:.2%}")
            print(f"Sharpe Ratio: {results['sharpe_ratio']:.2f}")
            print(f"Max Drawdown: {results['max_drawdown']:.2%}")

if __name__ == "__main__":
    test_services() 
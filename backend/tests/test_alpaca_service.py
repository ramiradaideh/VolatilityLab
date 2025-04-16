import sys
import os
from datetime import datetime
import pytest

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.services.alpaca_service import AlpacaService

def test_alpaca_service():
    """Test the Alpaca service functionality"""
    alpaca_service = AlpacaService()
    
    # Test account info
    print("\nTesting account info...")
    account_info = alpaca_service.get_account_info()
    print(f"Account Info: {account_info}")
    assert isinstance(account_info, dict)
    assert 'cash' in account_info
    
    # Test stock order submission (small quantity for testing)
    print("\nTesting stock order submission...")
    stock_order = alpaca_service.submit_stock_order(
        symbol="AAPL",
        qty=1,
        side="buy",
        order_type="market"
    )
    print(f"Stock Order: {stock_order}")
    assert isinstance(stock_order, dict)
    assert 'order_id' in stock_order
    
    # Test getting positions
    print("\nTesting position retrieval...")
    positions = alpaca_service.get_positions()
    print(f"Current Positions: {positions}")
    assert isinstance(positions, list)
    
    # Test getting open orders
    print("\nTesting open orders retrieval...")
    open_orders = alpaca_service.get_open_orders()
    print(f"Open Orders: {open_orders}")
    assert isinstance(open_orders, list)

if __name__ == "__main__":
    pytest.main([__file__, "-v", "-s"])

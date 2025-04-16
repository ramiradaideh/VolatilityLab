from typing import Dict, List, Optional, Union
import alpaca_trade_api as tradeapi
from alpaca_trade_api.rest import REST
import os
from datetime import datetime
import logging
from dotenv import load_dotenv

load_dotenv(override=True)

class AlpacaService:
    def __init__(self):
        """
        Initialize AlpacaService with API credentials from environment variables
        """
        self.api_key = os.getenv('ALPACA_API_KEY')
        self.api_secret = os.getenv('ALPACA_SECRET_KEY')
        self.base_url = os.getenv('ALPACA_BASE_URL', 'https://paper-api.alpaca.markets')  # Use paper trading by default
        
        if not all([self.api_key, self.api_secret]):
            raise ValueError("Alpaca API credentials not found in environment variables")
        
        self.api = tradeapi.REST(
            self.api_key,
            self.api_secret,
            self.base_url,
            api_version='v2'
        )
        
        # Set up logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)

    def get_account_info(self) -> Dict:
        """
        Get current account information
        """
        try:
            account = self.api.get_account()
            return {
                'cash': float(account.cash),
                'portfolio_value': float(account.portfolio_value),
                'buying_power': float(account.buying_power),
                'day_trade_count': account.daytrade_count
            }
        except Exception as e:
            self.logger.error(f"Error getting account info: {str(e)}")
            raise

    def get_position(self, symbol: str) -> Optional[Dict]:
        """
        Get current position for a symbol
        """
        try:
            position = self.api.get_position(symbol)
            return {
                'symbol': position.symbol,
                'quantity': float(position.qty),
                'avg_entry_price': float(position.avg_entry_price),
                'current_price': float(position.current_price),
                'market_value': float(position.market_value),
                'unrealized_pl': float(position.unrealized_pl)
            }
        except Exception as e:
            if 'position does not exist' in str(e).lower():
                return None
            self.logger.error(f"Error getting position for {symbol}: {str(e)}")
            raise

    def submit_stock_order(
        self,
        symbol: str,
        qty: float,
        side: str,
        order_type: str = 'market',
        time_in_force: str = 'day',
        limit_price: float = None,
        stop_price: float = None
    ) -> Dict:
        """
        Submit a stock order
        
        Args:
            symbol: Stock symbol
            qty: Number of shares
            side: 'buy' or 'sell'
            order_type: 'market', 'limit', 'stop', 'stop_limit'
            time_in_force: 'day', 'gtc', 'ioc', 'opg'
            limit_price: Limit price for limit orders
            stop_price: Stop price for stop orders
        """
        try:
            order = self.api.submit_order(
                symbol=symbol,
                qty=qty,
                side=side,
                type=order_type,
                time_in_force=time_in_force,
                limit_price=limit_price,
                stop_price=stop_price
            )
            
            return {
                'order_id': order.id,
                'client_order_id': order.client_order_id,
                'symbol': order.symbol,
                'status': order.status,
                'created_at': order.created_at
            }
        except Exception as e:
            self.logger.error(f"Error submitting {side} order for {symbol}: {str(e)}")
            raise

    def submit_option_order(
        self,
        symbol: str,
        side: str,
        qty: int,
        option_type: str,
        expiration_date: str,
        strike_price: float,
        order_type: str = 'market',
        time_in_force: str = 'day',
        limit_price: float = None
    ) -> Dict:
        """
        Submit an options order
        
        Args:
            symbol: Underlying stock symbol
            side: 'buy' or 'sell'
            qty: Number of contracts
            option_type: 'call' or 'put'
            expiration_date: Option expiration date (YYYY-MM-DD)
            strike_price: Option strike price
            order_type: 'market' or 'limit'
            time_in_force: 'day' or 'gtc'
            limit_price: Limit price for limit orders
        """
        try:
            # Construct the OCC option symbol
            exp_date = datetime.strptime(expiration_date, '%Y-%m-%d')
            option_symbol = f"{symbol}{exp_date.strftime('%y%m%d')}{option_type[0].upper()}{int(strike_price*1000):08d}"
            
            order = self.api.submit_order(
                symbol=option_symbol,
                qty=qty,
                side=side,
                type=order_type,
                time_in_force=time_in_force,
                limit_price=limit_price
            )
            
            return {
                'order_id': order.id,
                'client_order_id': order.client_order_id,
                'symbol': order.symbol,
                'status': order.status,
                'created_at': order.created_at
            }
        except Exception as e:
            self.logger.error(f"Error submitting option order for {symbol}: {str(e)}")
            raise

    def get_open_orders(self) -> List[Dict]:
        """
        Get all open orders
        """
        try:
            orders = self.api.list_orders(status='open')
            return [{
                'order_id': order.id,
                'symbol': order.symbol,
                'qty': float(order.qty),
                'side': order.side,
                'type': order.type,
                'status': order.status,
                'submitted_at': order.submitted_at
            } for order in orders]
        except Exception as e:
            self.logger.error(f"Error getting open orders: {str(e)}")
            raise

    def cancel_order(self, order_id: str) -> bool:
        """
        Cancel an open order
        """
        try:
            self.api.cancel_order(order_id)
            return True
        except Exception as e:
            self.logger.error(f"Error canceling order {order_id}: {str(e)}")
            raise

    def get_positions(self) -> List[Dict]:
        """
        Get all current positions
        """
        try:
            positions = self.api.list_positions()
            return [{
                'symbol': pos.symbol,
                'qty': float(pos.qty),
                'avg_entry_price': float(pos.avg_entry_price),
                'current_price': float(pos.current_price),
                'market_value': float(pos.market_value),
                'unrealized_pl': float(pos.unrealized_pl)
            } for pos in positions]
        except Exception as e:
            self.logger.error(f"Error getting positions: {str(e)}")
            raise

    def close_position(self, symbol: str) -> Dict:
        """
        Close entire position for a symbol
        """
        try:
            response = self.api.close_position(symbol)
            return {
                'symbol': response.symbol,
                'qty': float(response.qty),
                'status': 'closed'
            }
        except Exception as e:
            self.logger.error(f"Error closing position for {symbol}: {str(e)}")
            raise

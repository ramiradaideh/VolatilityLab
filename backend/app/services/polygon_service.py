from polygon import RESTClient
from datetime import datetime, timedelta
import os
from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)

class PolygonService:
    def __init__(self):
        self.api_key = os.getenv("POLYGON_API_KEY")
        if not self.api_key:
            raise ValueError("POLYGON_API_KEY environment variable is not set")
        self.client = RESTClient(api_key=self.api_key)

    def get_stock_data(self, symbol: str, start_date: datetime, end_date: datetime) -> List[Dict[str, Any]]:
        """
        Fetch historical stock data from Polygon.io
        """
        try:
            logger.info(f"Fetching data for {symbol} from {start_date} to {end_date}")
            aggs = []
            for a in self.client.list_aggs(
                symbol,
                multiplier=1,
                timespan="day",
                from_=start_date.strftime("%Y-%m-%d"),
                to=end_date.strftime("%Y-%m-%d"),
                limit=50000
            ):
                aggs.append({
                    "timestamp": a.timestamp,
                    "open": a.open,
                    "high": a.high,
                    "low": a.low,
                    "close": a.close,
                    "volume": a.volume,
                    "vwap": a.vwap,
                    "transactions": a.transactions
                })
            logger.info(f"Retrieved {len(aggs)} data points for {symbol}")
            if len(aggs) == 0:
                logger.warning(f"No data returned for {symbol} between {start_date} and {end_date}")
            return aggs
        except Exception as e:
            logger.error(f"Error fetching data for {symbol}: {str(e)}")
            return []

    def get_option_chain(self, symbol: str) -> List[Dict[str, Any]]:
        """
        Fetch option chain data from Polygon.io
        Note: This requires a paid subscription
        """
        try:
            options = []
            for opt in self.client.list_options_contracts(
                underlying_symbol=symbol,
                limit=50000
            ):
                options.append({
                    "symbol": opt.symbol,
                    "strike_price": opt.strike_price,
                    "expiration_date": opt.expiration_date,
                    "contract_type": opt.contract_type,
                    "exercise_style": opt.exercise_style,
                    "shares_per_contract": opt.shares_per_contract
                })
            return options
        except Exception as e:
            print(f"Error fetching options for {symbol}: {str(e)}")
            return [] 

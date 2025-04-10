import pandas as pd
import numpy as np
from typing import Dict, Any, List
from datetime import datetime

class BacktestService:
    def __init__(self):
        self.strategies = {
            "simple_moving_average": self.simple_moving_average_strategy,
            "rsi_strategy": self.rsi_strategy,
            # Add more strategies here
        }

    def run_backtest(
        self,
        data: List[Dict[str, Any]],
        strategy_name: str,
        parameters: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Run a backtest on the given data using the specified strategy
        """
        if strategy_name not in self.strategies:
            raise ValueError(f"Strategy {strategy_name} not found")

        # Convert data to DataFrame
        df = pd.DataFrame(data)
        df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
        df.set_index('timestamp', inplace=True)

        # Run the strategy
        strategy = self.strategies[strategy_name]
        signals = strategy(df, parameters)

        # Calculate returns
        df['returns'] = df['close'].pct_change()
        df['strategy_returns'] = df['returns'] * signals

        # Calculate metrics
        total_return = (1 + df['strategy_returns']).prod() - 1
        sharpe_ratio = self.calculate_sharpe_ratio(df['strategy_returns'])
        max_drawdown = self.calculate_max_drawdown(df['strategy_returns'])

        return {
            "total_return": total_return,
            "sharpe_ratio": sharpe_ratio,
            "max_drawdown": max_drawdown,
            "signals": signals.tolist(),
            "equity_curve": (1 + df['strategy_returns']).cumprod().tolist()
        }

    def simple_moving_average_strategy(
        self,
        df: pd.DataFrame,
        parameters: Dict[str, Any]
    ) -> pd.Series:
        """
        Simple Moving Average Crossover Strategy
        """
        short_window = parameters.get('short_window', 20)
        long_window = parameters.get('long_window', 50)

        df['SMA_short'] = df['close'].rolling(window=short_window).mean()
        df['SMA_long'] = df['close'].rolling(window=long_window).mean()

        signals = pd.Series(0, index=df.index)
        signals[df['SMA_short'] > df['SMA_long']] = 1
        signals[df['SMA_short'] < df['SMA_long']] = -1

        return signals

    def calculate_rsi(self, prices: pd.Series, period: int = 14) -> pd.Series:
        """
        Calculate RSI (Relative Strength Index)
        
        Args:
            prices: Series of closing prices
            period: Number of periods for calculation (default: 14)
            
        Returns:
            Series of RSI values
        """
        # Calculate price changes
        delta = prices.diff()
        
        # Separate gains and losses
        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
        
        # Calculate Relative Strength (RS)
        rs = gain / loss
        
        # Calculate RSI
        rsi = 100 - (100 / (1 + rs))
        
        return rsi

    def rsi_strategy(
        self,
        df: pd.DataFrame,
        parameters: Dict[str, Any]
    ) -> pd.Series:
        """
        RSI Strategy
        """
        period = parameters.get('period', 14)
        overbought = parameters.get('overbought', 70)
        oversold = parameters.get('oversold', 30)

        # Calculate RSI
        rsi = self.calculate_rsi(df['close'], period)

        # Generate signals
        signals = pd.Series(0, index=df.index)
        signals[rsi < oversold] = 1    # Buy when RSI is oversold
        signals[rsi > overbought] = -1  # Sell when RSI is overbought

        return signals

    def calculate_sharpe_ratio(self, returns: pd.Series) -> float:
        """
        Calculate the Sharpe ratio
        """
        if len(returns) < 2:
            return 0.0
        return np.sqrt(252) * returns.mean() / returns.std()

    def calculate_max_drawdown(self, returns: pd.Series) -> float:
        """
        Calculate the maximum drawdown
        """
        cumulative = (1 + returns).cumprod()
        rolling_max = cumulative.expanding().max()
        drawdowns = cumulative / rolling_max - 1
        return drawdowns.min() 
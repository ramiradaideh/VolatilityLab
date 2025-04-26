import pandas as pd
import numpy as np
from typing import Dict, Any, List
from datetime import datetime
import statsmodels.api as sm
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)

class BacktestService:
    def __init__(self):
        self.strategies = {
            "simple_moving_average": self.simple_moving_average_strategy,
            "rsi_strategy": self.rsi_strategy,
            "momentum_regression": self.momentum_regression_strategy,
        }

    def run_backtest(self, data: List[Dict[str, Any]], strategy_name: str, parameters: Dict[str, Any]) -> Dict[str, Any]:
        logger.info(f"Running backtest for strategy: {strategy_name} with parameters: {parameters}")

        if strategy_name not in self.strategies:
            logger.error(f"Strategy {strategy_name} not found")
            raise ValueError(f"Strategy {strategy_name} not found")

        df = pd.DataFrame(data)
        df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
        df.set_index('timestamp', inplace=True)

        logger.debug("Initial DataFrame:\n%s", df.head())

        if df.empty or df['close'].isnull().any():
            logger.error("Input data is empty or contains invalid values")
            raise ValueError("Input data is empty or contains invalid values")

        try:
            strategy = self.strategies[strategy_name]
            signals = strategy(df.copy(), parameters)

            df['returns'] = df['close'].pct_change()
            df['strategy_returns'] = df['returns'] * signals

            logger.debug("Returns and strategy_returns calculated:\n%s", df[['returns', 'strategy_returns']].dropna().head())

            total_return = (1 + df['strategy_returns']).prod() - 1
            sharpe_ratio = self.calculate_sharpe_ratio(df['strategy_returns'])
            max_drawdown = self.calculate_max_drawdown(df['strategy_returns'])

            logger.info(f"Backtest completed: Total Return={total_return:.4f}, Sharpe={sharpe_ratio:.4f}, Max Drawdown={max_drawdown:.4f}")

            return {
                "total_return": self.safe_float(total_return),
                "sharpe_ratio": self.safe_float(sharpe_ratio),
                "max_drawdown": self.safe_float(max_drawdown),
                "signals": signals.fillna(0).astype(float).tolist(),
                "equity_curve": (1 + df['strategy_returns']).cumprod().fillna(1).astype(float).tolist(),
            }

        except Exception as e:
            logger.exception("Error during backtest execution")
            return {
                "total_return": 0.0,
                "sharpe_ratio": 0.0,
                "max_drawdown": 0.0,
                "signals": [],
                "equity_curve": [],
            }

    def safe_float(self, val: float) -> float:
        try:
            return float(np.nan_to_num(val, nan=0.0, posinf=0.0, neginf=0.0))
        except Exception as e:
            logger.warning(f"safe_float conversion error: {e}")
            return 0.0

    def simple_moving_average_strategy(self, df: pd.DataFrame, parameters: Dict[str, Any]) -> pd.Series:
        try:
            short = parameters.get('short_window', 20)
            long = parameters.get('long_window', 50)
            logger.info(f"Running SMA strategy: short={short}, long={long}")

            df['SMA_short'] = df['close'].rolling(window=short).mean()
            df['SMA_long'] = df['close'].rolling(window=long).mean()

            signals = pd.Series(0, index=df.index)
            signals[df['SMA_short'] > df['SMA_long']] = 1
            signals[df['SMA_short'] < df['SMA_long']] = -1

            logger.debug("SMA signals generated")
            return signals.fillna(0)
        except Exception as e:
            logger.exception("SMA strategy failed")
            return pd.Series(0, index=df.index)

    def calculate_rsi(self, prices: pd.Series, period: int = 14) -> pd.Series:
        delta = prices.diff()
        gain = delta.where(delta > 0, 0).rolling(window=period).mean()
        loss = -delta.where(delta < 0, 0).rolling(window=period).mean()
        rs = gain / loss
        logger.debug(f"RSI calculated with period={period}")
        return 100 - (100 / (1 + rs))

    def rsi_strategy(self, df: pd.DataFrame, parameters: Dict[str, Any]) -> pd.Series:
        try:
            period = parameters.get('period', 14)
            overbought = parameters.get('overbought', 70)
            oversold = parameters.get('oversold', 30)

            logger.info(f"Running RSI strategy: period={period}, overbought={overbought}, oversold={oversold}")
            rsi = self.calculate_rsi(df['close'], period)

            signals = pd.Series(0, index=df.index)
            signals[rsi < oversold] = 1
            signals[rsi > overbought] = -1

            logger.debug("RSI signals generated")
            return signals.fillna(0)
        except Exception as e:
            logger.exception("RSI strategy failed")
            return pd.Series(0, index=df.index)

    def momentum_regression_strategy(self, df: pd.DataFrame, parameters: Dict[str, Any]) -> pd.Series:
        try:
            short = parameters.get("short_sma", 5)
            mid = parameters.get("mid_sma", 20)
            long = parameters.get("long_sma", 60)
            reg_window = parameters.get("regression_window", 30)

            logger.info(f"Running Momentum Regression strategy: short={short}, mid={mid}, long={long}, reg_window={reg_window}")

            df['SMA_short'] = df['close'].rolling(window=short).mean()
            df['SMA_mid'] = df['close'].rolling(window=mid).mean()
            df['SMA_long'] = df['close'].rolling(window=long).mean()
            df['return'] = df['close'].pct_change()

            weights = pd.Series(0.0, index=df.index)

            for i in range(reg_window, len(df)):
                window_df = df.iloc[i - reg_window:i]
                X = window_df[['SMA_short', 'SMA_mid', 'SMA_long']].dropna()
                y = window_df['return'].loc[X.index]

                if len(X) < reg_window // 2 or X.empty or y.empty:
                    continue

                X = sm.add_constant(X)
                model = sm.OLS(y, X).fit()

                alpha = model.params.get('const', 0.0)
                sigma_squared = np.var(model.resid) if len(model.resid) > 0 else 1e-6
                gamma = np.clip(alpha / (sigma_squared + 1e-6), -1, 1)

                weights.iloc[i] = gamma

                if i % 50 == 0:
                    logger.debug(f"Iteration {i}: alpha={alpha:.4f}, sigma²={sigma_squared:.6f}, gamma={gamma:.4f}")

            logger.debug("Momentum regression signals generated")
            return weights.fillna(0)
        except Exception as e:
            logger.exception("Momentum regression strategy failed")
            return pd.Series(0, index=df.index)

    def calculate_sharpe_ratio(self, returns: pd.Series) -> float:
        if len(returns) < 2 or returns.std() == 0:
            logger.warning("Sharpe ratio not computable (insufficient data or zero std)")
            return 0.0
        sharpe = np.sqrt(252) * returns.mean() / returns.std()
        logger.debug(f"Sharpe ratio: {sharpe:.4f}")
        return sharpe

    def calculate_max_drawdown(self, returns: pd.Series) -> float:
        cumulative = (1 + returns).cumprod()
        peak = cumulative.expanding(min_periods=1).max()
        drawdown = cumulative / peak - 1
        mdd = drawdown.min()
        logger.debug(f"Max drawdown: {mdd:.4f}")
        return mdd

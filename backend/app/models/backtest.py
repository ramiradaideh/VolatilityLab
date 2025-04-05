from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class BacktestResult(Base):
    __tablename__ = "backtest_results"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, index=True)
    strategy_name = Column(String)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    sharpe_ratio = Column(Float)
    total_return = Column(Float)
    max_drawdown = Column(Float)
    parameters = Column(JSON)
    results = Column(JSON)
    created_at = Column(DateTime) 
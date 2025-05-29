/**
 * Strategy data with descriptions and metadata
 */
const STRATEGIES = [
  {
    id: "simple_moving_average",
    name: "Simple Moving Average",
    bulletPoints: [
      "Trend-following strategy",
      "Buy when short SMA crosses above long SMA",
      "Sell when short SMA crosses below long SMA",
      "Best for trending markets"
    ]
  },
  {
    id: "exponential_moving_average",
    name: "Exponential Moving Average",
    bulletPoints: [
      "Trend-following strategy with higher responsiveness",
      "Uses 8 and 20 day EMAs with smoothing factor of 2",
      "More weight given to recent price movements",
      "Better for catching trend changes early"
    ]
  },
  {
    id: "rsi_strategy",
    name: "Relative Strength Index",
    bulletPoints: [
      "Mean-reversion strategy",
      "Buy when RSI falls below oversold level",
      "Sell when RSI rises above overbought level",
      "Best for range-bound markets"
    ]
  },
  {
    id: "momentum_regression",
    name: "Momentum Regression",
    bulletPoints: [
      "Advanced multi-timeframe strategy",
      "Uses regression analysis on price movements",
      "Adapts to market volatility",
      "Performs well in trending markets with volatility"
    ]
  }
];

export default STRATEGIES; 

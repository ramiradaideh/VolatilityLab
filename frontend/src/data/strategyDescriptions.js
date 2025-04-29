// Strategy descriptions for tooltips
const strategyDescriptions = {
  simple_moving_average: "A strategy that generates buy signals when the short-term moving average crosses above the long-term moving average, and sell signals when it crosses below. This strategy helps identify trends and potential entry/exit points.",
  
  rsi_strategy: "The Relative Strength Index (RSI) strategy generates buy signals when the RSI falls below the oversold level (typically 30) and sell signals when it rises above the overbought level (typically 70). This helps identify overbought and oversold conditions.",
  
  momentum_regression: "This strategy uses regression analysis on multiple moving averages to predict price momentum. It generates signals based on the strength and direction of the predicted momentum, helping to identify potential trend reversals and continuations."
};

export default strategyDescriptions; 

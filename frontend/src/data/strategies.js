/**
 * Strategy data with descriptions and metadata
 */
const STRATEGIES = [
  { 
    id: 1, 
    name: 'Simple Moving Average',
    description: 'A trend-following strategy that generates signals based on the crossing of short and long-term moving averages.',
    type: 'trend-following',
    complexity: 'beginner',
    bestFor: 'trending markets',
    bulletPoints: [
      'Short term',
      'Day to Day',
      'Algorithm learns as it goes'
    ]
  },
  { 
    id: 2, 
    name: 'RSI Strategy',
    description: 'A mean-reversion strategy that identifies overbought and oversold conditions using the Relative Strength Index.',
    type: 'mean-reversion',
    complexity: 'intermediate',
    bestFor: 'range-bound markets',
    bulletPoints: [
      'Longer Term',
      'Less Risk',
      'Leave and Forget'
    ]
  },
  { 
    id: 3, 
    name: 'Momentum Regression',
    description: 'An advanced momentum strategy that uses multiple timeframes and regression analysis for signal generation.',
    type: 'momentum',
    complexity: 'advanced',
    bestFor: 'volatile markets with clear trends',
    bulletPoints: [
      'Medium term',
      'Moderate Risk',
      'Requires periodic monitoring'
    ]
  },
];

export default STRATEGIES; 

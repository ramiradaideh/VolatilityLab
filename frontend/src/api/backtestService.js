/**
 * Base API URL for backend services
 */
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * API endpoints for backtest operations
 */
const ENDPOINTS = {
  STRATEGIES: '/strategies',
  RUN_BACKTEST: '/backtest',
  RESULTS: '/results',
};

/**
 * Fetch available trading strategies
 * @returns {Promise<Array>} List of available strategies
 */
export const fetchStrategies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STRATEGIES}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch strategies: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching strategies:', error);
    throw error;
  }
};

/**
 * Run backtest with specified parameters
 * @param {Object} params - Backtest parameters
 * @param {string} params.strategy - Strategy ID or name
 * @param {string} params.symbol - Stock symbol
 * @param {string} params.startDate - Start date in YYYY-MM-DD format
 * @param {string} params.endDate - End date in YYYY-MM-DD format
 * @param {Object} [params.options] - Additional strategy-specific options
 * @returns {Promise<Object>} Backtest results
 */
export const runBacktest = async (params) => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.RUN_BACKTEST}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to run backtest: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error running backtest:', error);
    throw error;
  }
};

/**
 * Fetch saved backtest result by ID
 * @param {string} resultId - Result ID
 * @returns {Promise<Object>} Backtest result details
 */
export const fetchBacktestResult = async (resultId) => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.RESULTS}/${resultId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch result: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching backtest result:', error);
    throw error;
  }
}; 

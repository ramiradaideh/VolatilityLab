/**
 * Format decimal number as percentage string
 * @param {number} value - Decimal value to format (e.g., 0.15)
 * @param {number} [precision=2] - Number of decimal places 
 * @returns {string} Formatted percentage (e.g., "15.00%")
 */
export const formatPercentage = (value, precision = 2) => {
  if (value === null || value === undefined) return 'N/A';
  return `${(value * 100).toFixed(precision)}%`;
};

/**
 * Format number with thousand separators
 * @param {number} value - Number to format
 * @param {number} [precision=2] - Number of decimal places
 * @returns {string} Formatted number
 */
export const formatNumber = (value, precision = 2) => {
  if (value === null || value === undefined) return 'N/A';
  return value.toLocaleString(undefined, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
};

/**
 * Format date to YYYY-MM-DD string
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return '';
  return date.toISOString().split('T')[0];
};

/**
 * Format currency value
 * @param {number} value - Value to format
 * @param {string} [currency='USD'] - Currency code
 * @param {number} [precision=2] - Number of decimal places
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD', precision = 2) => {
  if (value === null || value === undefined) return 'N/A';
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value);
}; 

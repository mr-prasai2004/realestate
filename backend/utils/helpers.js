/**
 * Calculate date difference in days
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date
 * @returns {number} - Number of days
 */
const calculateDateDiff = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  /**
   * Format date to YYYY-MM-DD
   * @param {Date|string} date - Date to format
   * @returns {string} - Formatted date string
   */
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };
  
  /**
   * Format price with currency symbol
   * @param {number} price - Price to format
   * @param {string} currency - Currency symbol (default: $)
   * @returns {string} - Formatted price string
   */
  const formatPrice = (price, currency = '$') => {
    return `${currency}${parseFloat(price).toFixed(2)}`;
  };
  
  /**
   * Extract pagination parameters from request query
   * @param {Object} query - Request query object
   * @param {number} defaultLimit - Default limit (default: 10)
   * @param {number} maxLimit - Maximum limit (default: 100)
   * @returns {Object} - Pagination parameters
   */
  const getPaginationParams = (query, defaultLimit = 10, maxLimit = 100) => {
    const page = parseInt(query.page) || 1;
    let limit = parseInt(query.limit) || defaultLimit;
    
    // Ensure limit doesn't exceed maximum
    if (limit > maxLimit) {
      limit = maxLimit;
    }
    
    const offset = (page - 1) * limit;
    
    return { page, limit, offset };
  };
  
  /**
   * Build pagination response
   * @param {Array} items - Items for current page
   * @param {number} total - Total number of items
   * @param {number} page - Current page
   * @param {number} limit - Items per page
   * @returns {Object} - Pagination response
   */
  const buildPaginationResponse = (items, total, page, limit) => {
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;
    
    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext,
        hasPrev,
        nextPage: hasNext ? page + 1 : null,
        prevPage: hasPrev ? page - 1 : null
      }
    };
  };
  
  /**
   * Sanitize object by removing undefined or null properties
   * @param {Object} obj - Object to sanitize
   * @returns {Object} - Sanitized object
   */
  const sanitizeObject = (obj) => {
    return Object.entries(obj)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  };
  
  /**
   * Create an error response object
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @returns {Object} - Error object
   */
  const createError = (message, statusCode = 500) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  };
  
  /**
   * Filter sensitive data from user object
   * @param {Object} user - User object
   * @returns {Object} - Filtered user object
   */
  const filterUserData = (user) => {
    const { password, ...filteredUser } = user;
    return filteredUser;
  };
  
  module.exports = {
    calculateDateDiff,
    formatDate,
    formatPrice,
    getPaginationParams,
    buildPaginationResponse,
    sanitizeObject,
    createError,
    filterUserData
  };
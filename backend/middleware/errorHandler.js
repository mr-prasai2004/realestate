/**
 * Custom error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const errorHandler = (err, req, res, next) => {
    // Log error to console for debugging
    console.error(err.stack);
  
    // Check if error has a status code, default to 500
    const statusCode = err.statusCode || 500;
    
    // Create response
    const response = {
      error: true,
      message: err.message || 'Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };
  
    // Send response
    res.status(statusCode).json(response);
  };
  
  module.exports = errorHandler;
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const config = require('../config/config');

/**
 * Middleware to authenticate JWT token
 */
const protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with Bearer
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, config.jwt.secret);

      // Get user from database (exclude password)
      const [rows] = await pool.execute(
        'SELECT id, email, name, role, created_at FROM users WHERE id = ?',
        [decoded.id]
      );

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }
      
      // Set user in request
      req.user = rows[0];
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

/**
 * Middleware to restrict access based on user role
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `User role ${req.user.role} is not authorized to access this resource` 
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
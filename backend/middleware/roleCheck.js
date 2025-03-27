const config = require('../config/config');

/**
 * Middleware to check if user has required role
 * @param {...String} roles - Roles that are allowed to access the resource
 */
const checkRole = (...roles) => {
  return (req, res, next) => {
    // Make sure req.user exists (auth middleware should be used before this)
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const { role } = req.user;
    
    // Check if user role is included in the allowed roles
    if (!roles.includes(role)) {
      return res.status(403).json({ 
        message: 'You do not have permission to perform this action' 
      });
    }
    
    next();
  };
};

// Middleware to check if user is property owner
const isPropertyOwner = async (req, res, next) => {
  try {
    const propertyId = req.params.id;
    const userId = req.user.id;
    
    // Check if property exists and belongs to the user
    const [rows] = await pool.execute(
      'SELECT * FROM properties WHERE id = ? AND owner_id = ?',
      [propertyId, userId]
    );
    
    if (rows.length === 0) {
      return res.status(403).json({ 
        message: 'You are not authorized to manage this property' 
      });
    }
    
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Middleware to check if user is booking owner
const isBookingOwner = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;
    
    // Check if booking exists and belongs to the user
    const [rows] = await pool.execute(
      'SELECT * FROM bookings WHERE id = ? AND user_id = ?',
      [bookingId, userId]
    );
    
    if (rows.length === 0) {
      return res.status(403).json({ 
        message: 'You are not authorized to manage this booking' 
      });
    }
    
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { 
  checkRole,
  isPropertyOwner,
  isBookingOwner 
};
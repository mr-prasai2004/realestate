const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
    // Token expiration time
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  
  // User roles
  roles: {
    ADMIN: 'admin',
    OWNER: 'owner',
    RENTER: 'renter',
    GUEST: 'guest'
  },
  
  // Pagination defaults
  pagination: {
    defaultLimit: 10,
    maxLimit: 100
  }
};
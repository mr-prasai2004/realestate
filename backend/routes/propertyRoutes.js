const express = require('express');
const router = express.Router();
const { 
  getAllProperties, 
  getPropertyById, 
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
  checkAvailability
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');
const { checkRole, isPropertyOwner } = require('../middleware/roleCheck');
const { roles } = require('../config/config');

// Public routes
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.post('/check-availability', checkAvailability);

// Protected routes
router.get('/user/my-properties', protect, getMyProperties);
router.post('/', protect, checkRole(roles.OWNER, roles.ADMIN, roles.RENTER), createProperty);
router.put('/:id', protect, isPropertyOwner, updateProperty);
router.delete('/:id', protect, isPropertyOwner, deleteProperty);

module.exports = router;
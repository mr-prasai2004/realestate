const express = require('express');
const router = express.Router();

const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
  checkAvailability,
  uploadPropertyImages // ✅ Multer middleware for handling image uploads
} = require('../controllers/propertyController');

const { protect } = require('../middleware/authMiddleware');
const { checkRole, isPropertyOwner } = require('../middleware/roleCheck');
const { roles } = require('../config/config');

// 🔓 Public routes
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.post('/check-availability', checkAvailability);

// 🔒 Protected routes
router.get('/user/my-properties', protect, getMyProperties);

// ✅ Final working POST route (with auth, role check, and image upload)
router.post(
  '/',
  protect,
  checkRole(roles.OWNER, roles.ADMIN, roles.RENTER),
  uploadPropertyImages, // multer middleware to parse form-data
  createProperty
);

// ✏️ Update and Delete routes (only for owners)
router.put('/:id', protect, isPropertyOwner, updateProperty);
router.delete('/:id', protect, isPropertyOwner, deleteProperty);

module.exports = router;

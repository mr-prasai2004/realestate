const express = require('express');
const router = express.Router();
const { 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  updateProfile 
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleCheck');
const { roles } = require('../config/config');

// Admin only routes
router.get('/', protect, checkRole(roles.ADMIN), getAllUsers);

// Protected routes
router.get('/profile', protect, getUserById);
router.put('/profile', protect, updateProfile);

// User specific routes (Admin or user themselves)
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;
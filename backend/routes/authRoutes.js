const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // Destructure to get just the protect function

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);

// Protected routes
router.get('/me', protect, authController.getMe);
router.put('/update-profile', protect, authController.updateProfile);

module.exports = router;
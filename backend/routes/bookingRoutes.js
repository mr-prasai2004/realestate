const express = require('express');
const router = express.Router();
const { 
  getAllBookings, 
  getBookingById, 
  createBooking,
  updateBookingStatus,
  deleteBooking,
  getMyBookings,
  getPropertyOwnerBookings
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { checkRole, isBookingOwner } = require('../middleware/roleCheck');
const { roles } = require('../config/config');

// Admin only routes
router.get('/', protect, checkRole(roles.ADMIN), getAllBookings);

// Protected routes
router.get('/my-bookings', protect, getMyBookings);
router.get('/property-bookings', protect, checkRole(roles.OWNER, roles.ADMIN), getPropertyOwnerBookings);
router.post('/', protect, createBooking);
router.get('/:id', protect, getBookingById);
router.put('/:id/status', protect, updateBookingStatus);
router.delete('/:id', protect, deleteBooking);

module.exports = router;
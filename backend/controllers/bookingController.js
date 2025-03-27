const Booking = require('../models/Booking');
const Property = require('../models/Property');
const config = require('../config/config');

/**
 * Controller to get all bookings (admin only)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getAllBookings = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || config.pagination.defaultLimit;
    const offset = (page - 1) * limit;

    // Get bookings
    const bookings = await Booking.getAll(limit, offset);

    res.status(200).json({
      bookings,
      pagination: {
        page,
        limit,
        hasMore: bookings.length === limit
      }
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

/**
 * Controller to get a booking by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is authorized to view this booking
    const isOwner = booking.user_id === req.user.id;
    const isPropertyOwner = booking.owner_id === req.user.id;
    const isAdmin = req.user.role === config.roles.ADMIN;

    if (!isOwner && !isPropertyOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }

    res.status(200).json({ booking });
  } catch (error) {
    console.error('Get booking by ID error:', error);
    res.status(500).json({
      message: 'Error fetching booking',
      error: error.message
    });
  }
};

/**
 * Controller to create a new booking
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const createBooking = async (req, res) => {
  try {
    const { property_id, start_date, end_date, message } = req.body;

    // Validate required fields
    if (!property_id || !start_date || !end_date) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if property exists
    const property = await Property.findById(property_id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if user is trying to book their own property
    if (property.owner_id === req.user.id) {
      return res.status(400).json({ message: 'You cannot book your own property' });
    }

    // Check if property is available for the requested dates
    const isAvailable = await Property.checkAvailability(property_id, start_date, end_date);
    if (!isAvailable) {
      return res.status(400).json({ message: 'Property is not available for the selected dates' });
    }

    // Calculate total price based on number of days
    const startDateObj = new Date(start_date);
    const endDateObj = new Date(end_date);
    const daysCount = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
    const totalPrice = property.price * daysCount;

    // Create booking
    const bookingId = await Booking.create({
      property_id,
      user_id: req.user.id,
      start_date,
      end_date,
      total_price: totalPrice,
      status: 'pending',
      message: message || ''
    });

    if (!bookingId) {
      return res.status(400).json({ message: 'Failed to create booking' });
    }

    // Get created booking
    const booking = await Booking.findById(bookingId);

    res.status(201).json({
      message: 'Booking request created successfully',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      message: 'Error creating booking',
      error: error.message
    });
  }
};

/**
 * Controller to update a booking status
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Get booking details
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check authorization
    const property = await Property.findById(booking.property_id);
    
    // Only property owner can approve/reject
    const isPropertyOwner = property.owner_id === req.user.id;
    // Booking user can cancel their own booking
    const isBookingUser = booking.user_id === req.user.id;
    // Admin can do anything
    const isAdmin = req.user.role === config.roles.ADMIN;

    // Enforce authorization rules
    if (status === 'approved' || status === 'rejected') {
      if (!isPropertyOwner && !isAdmin) {
        return res.status(403).json({ 
          message: 'Only the property owner can approve or reject bookings' 
        });
      }
    } else if (status === 'cancelled') {
      if (!isBookingUser && !isPropertyOwner && !isAdmin) {
        return res.status(403).json({ 
          message: 'Only the booking user or property owner can cancel bookings' 
        });
      }
    }

    // Update booking status
    const updated = await Booking.updateStatus(id, status);
    if (!updated) {
      return res.status(400).json({ message: 'Failed to update booking status' });
    }

    // Get updated booking
    const updatedBooking = await Booking.findById(id);

    res.status(200).json({
      message: `Booking ${status} successfully`,
      booking: updatedBooking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      message: 'Error updating booking status',
      error: error.message
    });
  }
};

/**
 * Controller to delete a booking
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Get booking details
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is authorized to delete this booking
    const isOwner = booking.user_id === req.user.id;
    const property = await Property.findById(booking.property_id);
    const isPropertyOwner = property.owner_id === req.user.id;
    const isAdmin = req.user.role === config.roles.ADMIN;

    if (!isOwner && !isPropertyOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this booking' });
    }

    // Delete booking
    const deleted = await Booking.delete(id);
    if (!deleted) {
      return res.status(400).json({ message: 'Failed to delete booking' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      message: 'Error deleting booking',
      error: error.message
    });
  }
};

/**
 * Controller to get user's bookings
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.getByUserId(req.user.id);
    
    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Get my bookings error:', error);
    res.status(500).json({
      message: 'Error fetching your bookings',
      error: error.message
    });
  }
};

/**
 * Controller to get bookings for owner's properties
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getPropertyOwnerBookings = async (req, res) => {
  try {
    const bookings = await Booking.getByOwnerId(req.user.id);
    
    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Get owner bookings error:', error);
    res.status(500).json({
      message: 'Error fetching property bookings',
      error: error.message
    });
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  deleteBooking,
  getMyBookings,
  getPropertyOwnerBookings
};
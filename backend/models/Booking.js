const { pool } = require('../config/db');

/**
 * Booking model with methods for database operations
 */
const Booking = {
  /**
   * Find a booking by its ID
   * @param {number} id - Booking ID
   * @returns {Promise<Object>} Booking object
   */
  findById: async (id) => {
    try {
      const [rows] = await pool.execute(
        `SELECT b.*, p.title as property_title, p.image_url as property_image,
                u.name as user_name, o.name as owner_name
         FROM bookings b
         JOIN properties p ON b.property_id = p.id
         JOIN users u ON b.user_id = u.id
         JOIN users o ON p.owner_id = o.id
         WHERE b.id = ?`,
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create a new booking
   * @param {Object} bookingData - Booking data
   * @returns {Promise<number>} New booking ID
   */
  create: async (bookingData) => {
    try {
      const [result] = await pool.execute(
        `INSERT INTO bookings 
         (property_id, user_id, start_date, end_date, total_price, status, message) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          bookingData.property_id,
          bookingData.user_id,
          bookingData.start_date,
          bookingData.end_date,
          bookingData.total_price,
          bookingData.status || 'pending',
          bookingData.message || ''
        ]
      );

      return result.insertId;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update a booking
   * @param {number} id - Booking ID
   * @param {Object} bookingData - Updated booking data
   * @returns {Promise<boolean>} Success status
   */
  update: async (id, bookingData) => {
    try {
      let query = 'UPDATE bookings SET ';
      const values = [];
      
      // Build dynamic query based on provided fields
      const fields = [
        'start_date', 'end_date', 'total_price', 'status', 'message'
      ];
      
      let hasFields = false;
      
      for (const field of fields) {
        if (bookingData[field] !== undefined) {
          query += `${field} = ?, `;
          values.push(bookingData[field]);
          hasFields = true;
        }
      }
      
      // If no fields were updated, return early
      if (!hasFields) {
        return false;
      }
      
      // Remove trailing comma and space
      query = query.slice(0, -2);
      
      // Add WHERE clause
      query += ' WHERE id = ?';
      values.push(id);
      
      const [result] = await pool.execute(query, values);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete a booking by ID
   * @param {number} id - Booking ID
   * @returns {Promise<boolean>} Success status
   */
  delete: async (id) => {
    try {
      const [result] = await pool.execute(
        'DELETE FROM bookings WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all bookings with pagination
   * @param {number} limit - Number of records to return
   * @param {number} offset - Number of records to skip
   * @returns {Promise<Array>} Array of bookings
   */
  getAll: async (limit = 10, offset = 0) => {
    try {
      const [rows] = await pool.execute(
        `SELECT b.*, p.title as property_title, 
                u.name as user_name, o.name as owner_name
         FROM bookings b
         JOIN properties p ON b.property_id = p.id
         JOIN users u ON b.user_id = u.id
         JOIN users o ON p.owner_id = o.id
         ORDER BY b.created_at DESC
         LIMIT ? OFFSET ?`,
        [limit, offset]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get bookings by user ID (renter)
   * @param {number} userId - User ID
   * @returns {Promise<Array>} Array of bookings
   */
  getByUserId: async (userId) => {
    try {
      const [rows] = await pool.execute(
        `SELECT b.*, p.title as property_title, p.image_url as property_image,
                p.address, p.city, p.state, p.zip_code, o.name as owner_name
         FROM bookings b
         JOIN properties p ON b.property_id = p.id
         JOIN users o ON p.owner_id = o.id
         WHERE b.user_id = ?
         ORDER BY b.start_date DESC`,
        [userId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get bookings by property owner ID
   * @param {number} ownerId - Property owner ID
   * @returns {Promise<Array>} Array of bookings
   */
  getByOwnerId: async (ownerId) => {
    try {
      const [rows] = await pool.execute(
        `SELECT b.*, p.title as property_title, p.image_url as property_image,
                u.name as user_name, u.email as user_email
         FROM bookings b
         JOIN properties p ON b.property_id = p.id
         JOIN users u ON b.user_id = u.id
         WHERE p.owner_id = ?
         ORDER BY b.status = 'pending' DESC, b.start_date ASC`,
        [ownerId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get bookings by property ID
   * @param {number} propertyId - Property ID
   * @returns {Promise<Array>} Array of bookings
   */
  getByPropertyId: async (propertyId) => {
    try {
      const [rows] = await pool.execute(
        `SELECT b.*, u.name as user_name
         FROM bookings b
         JOIN users u ON b.user_id = u.id
         WHERE b.property_id = ?
         ORDER BY b.start_date ASC`,
        [propertyId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update booking status
   * @param {number} id - Booking ID
   * @param {string} status - New status (pending, approved, rejected, cancelled)
   * @returns {Promise<boolean>} Success status
   */
  updateStatus: async (id, status) => {
    try {
      const [result] = await pool.execute(
        'UPDATE bookings SET status = ? WHERE id = ?',
        [status, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Booking;
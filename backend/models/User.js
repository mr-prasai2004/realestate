const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

/**
 * User model with methods for database operations
 */
const User = {
  /**
   * Find a user by their ID
   * @param {number} id - User ID
   * @returns {Promise<Object>} User object
   */
  findById: async (id) => {
    try {
      const [rows] = await pool.execute(
        'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Find a user by their email
   * @param {string} email - User email
   * @returns {Promise<Object>} User object
   */
  findByEmail: async (email) => {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<number>} New user ID
   */
  create: async (userData) => {
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Insert user
      const [result] = await pool.execute(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [userData.name, userData.email, hashedPassword, userData.role]
      );

      return result.insertId;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update a user
   * @param {number} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise<boolean>} Success status
   */
  update: async (id, userData) => {
    try {
      let query = 'UPDATE users SET ';
      const values = [];
      
      // Build dynamic query based on provided fields
      if (userData.name) {
        query += 'name = ?, ';
        values.push(userData.name);
      }
      
      if (userData.email) {
        query += 'email = ?, ';
        values.push(userData.email);
      }
      
      if (userData.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        query += 'password = ?, ';
        values.push(hashedPassword);
      }
      
      if (userData.role) {
        query += 'role = ?, ';
        values.push(userData.role);
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
   * Delete a user by ID
   * @param {number} id - User ID
   * @returns {Promise<boolean>} Success status
   */
  delete: async (id) => {
    try {
      const [result] = await pool.execute(
        'DELETE FROM users WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Compare password with hashed password in database
   * @param {string} enteredPassword - Password to check
   * @param {string} hashedPassword - Stored hashed password
   * @returns {Promise<boolean>} Whether passwords match
   */
  comparePassword: async (enteredPassword, hashedPassword) => {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  },

  /**
   * Get all users with pagination
   * @param {number} limit - Number of records to return
   * @param {number} offset - Number of records to skip
   * @returns {Promise<Array>} Array of users
   */
  getAll: async (limit = 10, offset = 0) => {
    try {
      const [rows] = await pool.execute(
        'SELECT id, name, email, role, created_at FROM users LIMIT ? OFFSET ?',
        [limit, offset]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = User;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

/**
 * Generate JWT token for a user
 * @param {number} id - User ID
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

/**
 * Controller for user registration
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with that email' });
    }

    // Set default role if not provided
    const userRole = role || config.roles.RENTER;

    // Create user
    const userId = await User.create({
      name,
      email,
      password,
      role: userRole
    });

    if (userId) {
      // Get created user (without password)
      const user = await User.findById(userId);
      
      // Generate token
      const token = generateToken(userId);

      res.status(201).json({
        message: 'User registered successfully',
        user,
        token
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ 
      message: 'Error registering user',
      error: error.message 
    });
  }
};

/**
 * Controller for user login
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id);

    // Remove password from response
    const { password: userPassword, ...userWithoutPassword } = user;

    res.status(200).json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Error logging in',
      error: error.message 
    });
  }
};

/**
 * Controller to get current user profile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.getMe = async (req, res) => {
  try {
    // req.user is set by auth middleware
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ 
      message: 'Error fetching user profile',
      error: error.message 
    });
  }
};

/**
 * Controller for updating user password
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        message: 'Please provide current password and new password' 
      });
    }

    // Get user with password
    const user = await User.findByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if current password is correct
    const isMatch = await User.comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password
    const updated = await User.update(user.id, { password: newPassword });
    if (!updated) {
      return res.status(400).json({ message: 'Failed to update password' });
    }

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ 
      message: 'Error updating password',
      error: error.message 
    });
  }
};

/**
 * Controller for password reset request
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ message: 'Please provide an email address' });
    }

    // Check if user exists
    const user = await User.findByEmail(email);
    if (!user) {
      // Don't reveal that the user doesn't exist
      return res.status(200).json({ 
        message: 'If a user with that email exists, a password reset link has been sent' 
      });
    }

    // In a real application, you would:
    // 1. Generate a reset token and save it to the database with an expiry
    // 2. Send an email with a link containing the token
    
    // For now, we'll just return a success message
    res.status(200).json({ 
      message: 'If a user with that email exists, a password reset link has been sent' 
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ 
      message: 'Error processing password reset request',
      error: error.message 
    });
  }
};

/**
 * Controller for updating user profile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    // Create update object with only provided fields
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    
    // Update user
    const updated = await User.update(req.user.id, updateData);
    if (!updated) {
      return res.status(400).json({ message: 'Failed to update profile' });
    }
    
    // Get updated user
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      message: 'Error updating profile',
      error: error.message 
    });
  }
};
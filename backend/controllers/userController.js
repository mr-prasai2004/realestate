const User = require('../models/User');
const config = require('../config/config');

/**
 * Controller to get all users (admin only)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getAllUsers = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || config.pagination.defaultLimit;
    const offset = (page - 1) * limit;

    // Get users
    const users = await User.getAll(limit, offset);

    res.status(200).json({ 
      users,
      pagination: {
        page,
        limit,
        hasMore: users.length === limit
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ 
      message: 'Error fetching users',
      error: error.message 
    });
  }
};

/**
 * Controller to get a user by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ 
      message: 'Error fetching user',
      error: error.message 
    });
  }
};

/**
 * Controller to update a user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    
    // Check if user exists
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prepare update data
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    
    // Only admin can update role
    if (role && req.user.role === config.roles.ADMIN) {
      updateData.role = role;
    }

    // Update user
    const updated = await User.update(req.params.id, updateData);
    if (!updated) {
      return res.status(400).json({ message: 'Failed to update user' });
    }

    // Get updated user
    const updatedUser = await User.findById(req.params.id);

    res.status(200).json({ 
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ 
      message: 'Error updating user',
      error: error.message 
    });
  }
};

/**
 * Controller to delete a user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const deleteUser = async (req, res) => {
  try {
    // Check if user exists
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user
    const deleted = await User.delete(req.params.id);
    if (!deleted) {
      return res.status(400).json({ message: 'Failed to delete user' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ 
      message: 'Error deleting user',
      error: error.message 
    });
  }
};

/**
 * Controller to update current user profile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Prepare update data
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    // Update user
    const updated = await User.update(req.user.id, updateData);
    if (!updated) {
      return res.status(400).json({ message: 'Failed to update profile' });
    }

    // Get updated user
    const updatedUser = await User.findById(req.user.id);

    res.status(200).json({ 
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      message: 'Error updating profile',
      error: error.message 
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateProfile
};
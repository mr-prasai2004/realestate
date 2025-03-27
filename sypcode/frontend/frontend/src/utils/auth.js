import {
  authService,
  setAuthToken,
  setCurrentUser,
  getCurrentUser,
  isAuthenticated,
  logout
} from '../services/api';

// Login function (already exists)
export const login = async (email, password) => {
  try {
    const response = await authService.login({ email, password });

    // Store the token and user in localStorage
    const { token, user } = response;
    setAuthToken(token);
    setCurrentUser(user);

    return {
      success: true,
      data: user
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.message || 'Invalid email or password'
    };
  }
};

// ✅ Add Register Function
export const register = async (userData) => {
  try {
    const response = await authService.register(userData);
    return {
      success: true,
      data: response
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: error.message || 'Registration failed'
    };
  }
};

// ✅ Add Forgot Password Function
export const forgotPassword = async (email) => {
  try {
    const response = await authService.forgotPassword(email);
    return {
      success: true,
      data: response
    };
  } catch (error) {
    console.error('Forgot password error:', error);
    return {
      success: false,
      error: error.message || 'Failed to process password reset'
    };
  }
};

// Export necessary functions
export { getCurrentUser, isAuthenticated, logout };

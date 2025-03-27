const API_URL = 'http://localhost:5000/api'; // Make sure this is correct

// Auth Service
const authService = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();
  },

  getProfile: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return await response.json();
  }
};

// Property Service
const propertyService = {
  addProperty: async (formData) => {
    const token = localStorage.getItem('token');
  
    const response = await fetch(`${API_URL}/properties`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData // 🔥 Use the FormData directly
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add property');
    }
  
    return await response.json();
  },
}  



// Auth Utilities
const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

const setCurrentUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export {
  authService,
  propertyService,
  setAuthToken,
  setCurrentUser,
  getCurrentUser,
  isAuthenticated,
  logout
};

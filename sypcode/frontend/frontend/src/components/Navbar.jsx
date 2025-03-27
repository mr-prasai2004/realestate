import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      
      // In a real app, you would decode the token to get user info
      // This is a placeholder for demonstration
      setUserType('renter'); // or 'owner' or 'admin'
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-primary-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">RM</span>
              </div>
              <span className="ml-2 text-xl font-bold text-primary-700">RealEstate</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-secondary-500 hover:border-primary-500 hover:text-primary-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/properties"
                className="border-transparent text-secondary-500 hover:border-primary-500 hover:text-primary-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Properties
              </Link>
              <Link
                to="/about"
                className="border-transparent text-secondary-500 hover:border-primary-500 hover:text-primary-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                About
              </Link>
            </div>
          </div>
          
          {/* Desktop Right Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isLoggedIn ? (
              <div className="relative ml-3">
                <div className="flex items-center">
                  <Link 
                    to="/dashboard" 
                    className="text-secondary-500 hover:text-primary-700 px-3 py-2 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="ml-4 bg-primary-600 text-white hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-secondary-500 hover:text-primary-700 px-3 py-2 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-secondary-400 hover:text-secondary-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="border-transparent text-secondary-500 hover:bg-gray-50 hover:border-primary-500 hover:text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/properties"
              className="border-transparent text-secondary-500 hover:bg-gray-50 hover:border-primary-500 hover:text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Properties
            </Link>
            <Link
              to="/about"
              className="border-transparent text-secondary-500 hover:bg-gray-50 hover:border-primary-500 hover:text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isLoggedIn ? (
              <div className="space-y-1">
                <Link
                  to="/dashboard"
                  className="border-transparent text-secondary-500 hover:bg-gray-50 hover:border-primary-500 hover:text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="border-transparent text-secondary-500 hover:bg-gray-50 hover:border-primary-500 hover:text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <Link
                  to="/login"
                  className="border-transparent text-secondary-500 hover:bg-gray-50 hover:border-primary-500 hover:text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border-transparent text-secondary-500 hover:bg-gray-50 hover:border-primary-500 hover:text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center">
                <span className="text-primary-700 font-bold">RM</span>
              </div>
              <span className="ml-2 text-xl font-bold">RealEstate</span>
            </div>
            <p className="text-primary-100 text-sm">
              Your trusted platform for finding and managing real estate properties.
              We make apartment rental easy and efficient.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-base font-medium text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-100 hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-primary-100 hover:text-white text-sm">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-100 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* User Links */}
          <div className="col-span-1">
            <h3 className="text-base font-medium text-white mb-4">For Users</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-primary-100 hover:text-white text-sm">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-primary-100 hover:text-white text-sm">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-primary-100 hover:text-white text-sm">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-base font-medium text-white mb-4">Contact Us</h3>
            <address className="not-italic text-primary-100 text-sm">
              <p>123 Main Street</p>
              <p>London, UK</p>
              <p className="mt-3">
                Email: <a href="mailto:info@realestate.com" className="hover:text-white">info@realestate.com</a>
              </p>
              <p>
                Phone: <a href="tel:+441234567890" className="hover:text-white">+44 123 456 7890</a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-100 text-sm">
              &copy; {new Date().getFullYear()} Real Estate Management. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-primary-100 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-100 hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
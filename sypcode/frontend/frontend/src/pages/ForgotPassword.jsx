import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AtSymbolIcon, KeyIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { forgotPassword as requestPasswordReset } from '../utils/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      await requestPasswordReset(email);
      setSucceeded(true);
      setLoading(false);
    } catch (error) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
            <KeyIcon className="h-6 w-6 text-primary-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-secondary-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        
        {succeeded ? (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Password reset link sent</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    We've sent a password reset link to {email}. Please check your email.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="-mx-2 -my-1.5 flex">
                    <Link
                      to="/login"
                      className="px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100"
                    >
                      Return to login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AtSymbolIcon className="h-5 w-5 text-secondary-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  'Send reset link'
                )}
              </button>
            </div>
            
            <div className="text-sm text-center">
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Return to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
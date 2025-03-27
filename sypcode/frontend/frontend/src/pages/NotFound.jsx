import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-primary-100">
          <span className="text-primary-600 text-6xl font-bold">404</span>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-secondary-900">
          Page Not Found
        </h2>
        <p className="mt-2 text-secondary-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="btn btn-primary inline-flex items-center"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
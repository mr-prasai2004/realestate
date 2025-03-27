import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  BuildingOfficeIcon,
  PlusCircleIcon,
  CalendarIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'My Properties', href: '/dashboard/my-properties', icon: BuildingOfficeIcon },
    { name: 'Add Property', href: '/dashboard/add-property', icon: PlusCircleIcon },
    { name: 'My Bookings', href: '/dashboard/my-bookings', icon: CalendarIcon },
    { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
  ];

  const handleLogout = () => {
    // Clear token/localStorage and redirect to login
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* Mobile sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-0 flex z-40 md:hidden`}>
        <div
          className="fixed inset-0 bg-secondary-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />

        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-primary-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-bold text-white">A1 Real Estate</h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-primary-900 text-white'
                      : 'text-primary-100 hover:bg-primary-700'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                >
                  <item.icon
                    className="mr-4 h-6 w-6 text-primary-200"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-primary-700 p-4">
            <button
              onClick={handleLogout}
              className="flex-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-primary-100 hover:bg-primary-700"
            >
              <ArrowRightOnRectangleIcon className="mr-4 h-6 w-6 text-primary-200" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-primary-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-white">A1 Real Estate</h1>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'bg-primary-900 text-white'
                        : 'text-primary-100 hover:bg-primary-700'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <item.icon
                      className="mr-3 h-6 w-6 text-primary-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-primary-700 p-4">
              <button
                onClick={handleLogout}
                className="flex-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-primary-100 hover:bg-primary-700"
              >
                <ArrowRightOnRectangleIcon className="mr-3 h-6 w-6 text-primary-200" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-secondary-500 hover:text-secondary-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
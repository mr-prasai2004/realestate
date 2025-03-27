import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  BuildingOfficeIcon,
  ClipboardDocumentCheckIcon,
  UserIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeBookings: 0,
    totalEarnings: 0,
    pendingRequests: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch user data and dashboard stats
    const fetchDashboardData = () => {
      setLoading(true);
      setTimeout(() => {
        // Mock data - this would come from your API
        setUser({
          id: 1,
          name: 'John Smith',
          email: 'john@example.com',
          phone: '+44 123 456 7890',
          role: 'owner',
          dateJoined: '2024-01-15',
        });

        setStats({
          totalProperties: 4,
          activeBookings: 2,
          totalEarnings: 6400,
          pendingRequests: 3
        });

        setRecentBookings([
          {
            id: 1,
            propertyId: 1,
            propertyTitle: 'Modern Apartment in City Center',
            renterName: 'Sarah Johnson',
            startDate: '2024-10-01',
            endDate: '2024-12-31',
            status: 'confirmed',
            totalAmount: 3600,
          },
          {
            id: 2,
            propertyId: 2,
            propertyTitle: 'Luxury Villa with Pool',
            renterName: 'Michael Thompson',
            startDate: '2024-11-15',
            endDate: '2025-02-15',
            status: 'pending',
            totalAmount: 7500,
          },
          {
            id: 3,
            propertyId: 4,
            propertyTitle: 'Family Home with Garden',
            renterName: 'Jessica Williams',
            startDate: '2024-12-01',
            endDate: '2025-01-31',
            status: 'confirmed',
            totalAmount: 3600,
          },
        ]);

        setLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">
          Welcome back, {user.name}!
        </h1>
        <p className="text-secondary-600 mt-1">
          Here's what's happening with your properties today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-primary-100 rounded-md flex items-center justify-center">
                <BuildingOfficeIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-secondary-500">Properties</h2>
              <p className="text-2xl font-semibold text-secondary-900">{stats.totalProperties}</p>
            </div>
          </div>
          <div className="mt-3">
            <Link to="/dashboard/my-properties" className="text-sm text-primary-600 hover:text-primary-800">
              View all properties →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-green-100 rounded-md flex items-center justify-center">
                <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-secondary-500">Active Bookings</h2>
              <p className="text-2xl font-semibold text-secondary-900">{stats.activeBookings}</p>
            </div>
          </div>
          <div className="mt-3">
            <Link to="/dashboard/my-bookings" className="text-sm text-primary-600 hover:text-primary-800">
              View all bookings →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-yellow-100 rounded-md flex items-center justify-center">
                <CurrencyDollarIcon className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-secondary-500">Total Earnings</h2>
              <p className="text-2xl font-semibold text-secondary-900">${stats.totalEarnings}</p>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-sm text-green-600">
              +12% from last month
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-red-100 rounded-md flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-secondary-500">Pending Requests</h2>
              <p className="text-2xl font-semibold text-secondary-900">{stats.pendingRequests}</p>
            </div>
          </div>
          <div className="mt-3">
            <Link to="/dashboard/my-bookings?status=pending" className="text-sm text-primary-600 hover:text-primary-800">
              Review requests →
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-secondary-900">Recent Bookings</h3>
          <p className="mt-1 text-sm text-secondary-500">
            A list of recent bookings for your properties.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Property
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Renter
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Dates
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded flex-shrink-0"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-secondary-900">
                          <Link to={`/properties/${booking.propertyId}`} className="hover:text-primary-600">
                            {booking.propertyTitle}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-900">{booking.renterName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-500">
                      {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-secondary-900">${booking.totalAmount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.status === 'confirmed' ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Confirmed
                      </span>
                    ) : booking.status === 'pending' ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Cancelled
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Link to="/dashboard/my-bookings" className="text-sm font-medium text-primary-600 hover:text-primary-800">
            View all bookings →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-secondary-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link to="/dashboard/add-property" className="group rounded-md p-3 bg-white hover:bg-primary-50 transition-colors border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-primary-100 rounded-md flex items-center justify-center group-hover:bg-primary-200">
                    <HomeIcon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-secondary-900">Add New Property</h3>
                  <p className="text-xs text-secondary-500 mt-1">List a new property for rent</p>
                </div>
              </div>
            </Link>

            <Link to="/dashboard/my-bookings" className="group rounded-md p-3 bg-white hover:bg-primary-50 transition-colors border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-primary-100 rounded-md flex items-center justify-center group-hover:bg-primary-200">
                    <ClipboardDocumentCheckIcon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-secondary-900">Manage Bookings</h3>
                  <p className="text-xs text-secondary-500 mt-1">View and manage your bookings</p>
                </div>
              </div>
            </Link>

            <Link to="/dashboard/my-properties" className="group rounded-md p-3 bg-white hover:bg-primary-50 transition-colors border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-primary-100 rounded-md flex items-center justify-center group-hover:bg-primary-200">
                    <BuildingOfficeIcon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-secondary-900">Edit Properties</h3>
                  <p className="text-xs text-secondary-500 mt-1">Update your property listings</p>
                </div>
              </div>
            </Link>

            <Link to="/dashboard/profile" className="group rounded-md p-3 bg-white hover:bg-primary-50 transition-colors border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-primary-100 rounded-md flex items-center justify-center group-hover:bg-primary-200">
                    <UserIcon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-secondary-900">Edit Profile</h3>
                  <p className="text-xs text-secondary-500 mt-1">Update your account details</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
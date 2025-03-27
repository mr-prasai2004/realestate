import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon,
  EllipsisHorizontalIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

// Mock data for bookings
const MOCK_BOOKINGS = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: 'Modern Apartment in City Center',
    propertyImage: '/api/placeholder/400/200',
    renterName: 'Sarah Johnson',
    renterEmail: 'sarah@example.com',
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    totalAmount: 3600,
    status: 'confirmed',
    createdAt: '2024-09-15'
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: 'Luxury Villa with Pool',
    propertyImage: '/api/placeholder/400/200',
    renterName: 'Michael Thompson',
    renterEmail: 'michael@example.com',
    startDate: '2024-11-15',
    endDate: '2025-02-15',
    totalAmount: 7500,
    status: 'pending',
    createdAt: '2024-09-20'
  },
  {
    id: 3,
    propertyId: 3,
    propertyTitle: 'Cozy Studio Near University',
    propertyImage: '/api/placeholder/400/200',
    renterName: 'David Williams',
    renterEmail: 'david@example.com',
    startDate: '2024-09-01',
    endDate: '2024-10-31',
    totalAmount: 1500,
    status: 'cancelled',
    createdAt: '2024-08-10'
  },
  {
    id: 4,
    propertyId: 4,
    propertyTitle: 'Family Home with Garden',
    propertyImage: '/api/placeholder/400/200',
    renterName: 'Jessica Williams',
    renterEmail: 'jessica@example.com',
    startDate: '2024-12-01',
    endDate: '2025-01-31',
    totalAmount: 3600,
    status: 'confirmed',
    createdAt: '2024-09-22'
  },
  {
    id: 5,
    propertyId: 1,
    propertyTitle: 'Modern Apartment in City Center',
    propertyImage: '/api/placeholder/400/200',
    renterName: 'Robert Brown',
    renterEmail: 'robert@example.com',
    startDate: '2025-01-15',
    endDate: '2025-03-15',
    totalAmount: 3600,
    status: 'pending',
    createdAt: '2024-09-25'
  }
];

const MyBookings = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialStatusFilter = queryParams.get('status') || 'all';

  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);

  useEffect(() => {
    // Simulate API call to fetch bookings
    const fetchBookings = () => {
      setLoading(true);
      setTimeout(() => {
        setBookings(MOCK_BOOKINGS);
        setLoading(false);
      }, 1000);
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    // Filter bookings based on status
    if (statusFilter === 'all') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter(booking => booking.status === statusFilter));
    }
  }, [bookings, statusFilter]);

  const handleBookingAction = (booking, action) => {
    // In a real app, you would make an API call here
    let updatedBookings;

    if (action === 'confirm') {
      updatedBookings = bookings.map(b => 
        b.id === booking.id ? { ...b, status: 'confirmed' } : b
      );
    } else if (action === 'cancel') {
      updatedBookings = bookings.map(b => 
        b.id === booking.id ? { ...b, status: 'cancelled' } : b
      );
    }

    setBookings(updatedBookings);
    setShowDetailsModal(false);
  };

  const openBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-4 w-4 mr-1" />
            Confirmed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="h-4 w-4 mr-1" />
            Pending
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="h-4 w-4 mr-1" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary-900">My Bookings</h1>
        <p className="text-secondary-600 mt-1">
          Manage booking requests for your properties.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setStatusFilter('all')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              statusFilter === 'all'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            All Bookings
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              statusFilter === 'pending'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('confirmed')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              statusFilter === 'confirmed'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              statusFilter === 'cancelled'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Cancelled
          </button>
        </nav>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="bg-white shadow rounded-lg overflow-hidden">
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
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded object-cover" src={booking.propertyImage} alt={booking.propertyTitle} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-secondary-900">{booking.propertyTitle}</div>
                          <div className="text-sm text-secondary-500">Booking #{booking.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-secondary-900">{booking.renterName}</div>
                      <div className="text-sm text-secondary-500">{booking.renterEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-secondary-900">{formatDate(booking.startDate)}</div>
                      <div className="text-sm text-secondary-500">to {formatDate(booking.endDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      ${booking.totalAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openBookingDetails(booking)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md py-16 text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary-100">
            <BuildingOfficeIcon className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="mt-4 text-xl font-medium text-secondary-900">No Bookings Found</h3>
          <p className="mt-2 text-secondary-500 max-w-md mx-auto">
            {statusFilter === 'all'
              ? "You don't have any bookings yet."
              : `You don't have any ${statusFilter} bookings.`}
          </p>
        </div>
      )}

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-secondary-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-secondary-900">
                      Booking Details
                    </h3>
                    <div className="mt-2">
                      <div className="border-b border-gray-200 py-3">
                        <h4 className="text-sm font-medium text-secondary-500">Property</h4>
                        <p className="mt-1 text-sm text-secondary-900">{selectedBooking.propertyTitle}</p>
                      </div>
                      <div className="border-b border-gray-200 py-3">
                        <h4 className="text-sm font-medium text-secondary-500">Renter Information</h4>
                        <p className="mt-1 text-sm text-secondary-900">{selectedBooking.renterName}</p>
                        <p className="text-sm text-secondary-500">{selectedBooking.renterEmail}</p>
                      </div>
                      <div className="border-b border-gray-200 py-3">
                        <h4 className="text-sm font-medium text-secondary-500">Booking Period</h4>
                        <p className="mt-1 text-sm text-secondary-900">
                          {formatDate(selectedBooking.startDate)} to {formatDate(selectedBooking.endDate)}
                        </p>
                      </div>
                      <div className="border-b border-gray-200 py-3">
                        <h4 className="text-sm font-medium text-secondary-500">Amount</h4>
                        <p className="mt-1 text-sm text-secondary-900">${selectedBooking.totalAmount}</p>
                      </div>
                      <div className="border-b border-gray-200 py-3">
                        <h4 className="text-sm font-medium text-secondary-500">Status</h4>
                        <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                      </div>
                      <div className="py-3">
                        <h4 className="text-sm font-medium text-secondary-500">Booking Date</h4>
                        <p className="mt-1 text-sm text-secondary-900">{formatDate(selectedBooking.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {selectedBooking.status === 'pending' && (
                  <>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => handleBookingAction(selectedBooking, 'confirm')}
                    >
                      Confirm Booking
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-secondary-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => handleBookingAction(selectedBooking, 'cancel')}
                    >
                      Decline
                    </button>
                  </>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-secondary-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleBookingAction(selectedBooking, 'cancel')}
                  >
                    Cancel Booking
                  </button>
                )}
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-secondary-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowDetailsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
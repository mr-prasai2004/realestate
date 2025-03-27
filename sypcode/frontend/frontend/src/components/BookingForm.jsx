import React, { useState, useEffect } from 'react';
import { CalendarIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const BookingForm = ({ property, onSubmit, onCancel }) => {
  const [bookingDates, setBookingDates] = useState({
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bookingDates.startDate && bookingDates.endDate) {
      // Calculate the number of months between start and end dates
      const start = new Date(bookingDates.startDate);
      const end = new Date(bookingDates.endDate);
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      
      // Calculate total price
      setTotalPrice(property.price * (months > 0 ? months : 1));
    } else {
      setTotalPrice(0);
    }
  }, [bookingDates, property.price]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!bookingDates.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!bookingDates.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (bookingDates.startDate && new Date(bookingDates.endDate) <= new Date(bookingDates.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit({
        propertyId: property.id,
        startDate: bookingDates.startDate,
        endDate: bookingDates.endDate,
        totalAmount: totalPrice
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-secondary-700">
          Move-in Date
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CalendarIcon className="h-5 w-5 text-secondary-400" />
          </div>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className={`input pl-10 ${errors.startDate ? 'border-red-300' : ''}`}
            min={property.availableDates?.start || new Date().toISOString().split('T')[0]}
            max={property.availableDates?.end}
            value={bookingDates.startDate}
            onChange={(e) => setBookingDates({...bookingDates, startDate: e.target.value})}
          />
          {errors.startDate && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>
        {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
      </div>
      
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-secondary-700">
          Move-out Date
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CalendarIcon className="h-5 w-5 text-secondary-400" />
          </div>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className={`input pl-10 ${errors.endDate ? 'border-red-300' : ''}`}
            min={bookingDates.startDate || property.availableDates?.start || new Date().toISOString().split('T')[0]}
            max={property.availableDates?.end}
            value={bookingDates.endDate}
            onChange={(e) => setBookingDates({...bookingDates, endDate: e.target.value})}
          />
          {errors.endDate && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>
        {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
      </div>
      
      {totalPrice > 0 && (
        <div className="p-3 bg-primary-50 rounded-md">
          <h4 className="font-semibold text-secondary-900">Booking Summary</h4>
          <div className="mt-2 flex justify-between">
            <span className="text-secondary-600">Monthly Rate:</span>
            <span className="font-medium">${property.price}</span>
          </div>
          <div className="mt-1 flex justify-between">
            <span className="text-secondary-600">Total Amount:</span>
            <span className="font-medium">${totalPrice}</span>
          </div>
        </div>
      )}
      
      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary flex-1"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (
            'Book Now'
          )}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
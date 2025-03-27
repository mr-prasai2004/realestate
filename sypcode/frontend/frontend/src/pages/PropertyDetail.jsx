import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPinIcon,
  HomeIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import PROPERTY_DATA from '../propertyData'; // Updated import

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingDates, setBookingDates] = useState({
    startDate: '',
    endDate: '',
  });
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchProperty = () => {
      setLoading(true);
      setTimeout(() => {
        const foundProperty = PROPERTY_DATA.find(p => p.id === parseInt(id, 10));
        setProperty(foundProperty || null);
        setLoading(false);
      }, 1000);
    };

    fetchProperty();
  }, [id]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would make an API call here to book the property
    alert('Booking submitted! In a real app, this would be processed and saved.');
    setShowBookingForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-secondary-900">Property Not Found</h2>
        <p className="mt-2 text-secondary-500">
          The property you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/properties" className="mt-4 btn btn-primary inline-block">
          Browse All Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex text-sm">
            <li className="flex items-center">
              <Link to="/" className="text-primary-600 hover:text-primary-800">
                Home
              </Link>
              <svg
                className="mx-2 h-5 w-5 text-secondary-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="flex items-center">
              <Link to="/properties" className="text-primary-600 hover:text-primary-800">
                Properties
              </Link>
              <svg
                className="mx-2 h-5 w-5 text-secondary-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <span className="text-secondary-500">{property.title}</span>
            </li>
          </ol>
        </nav>

        {/* Property Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-secondary-900">{property.title}</h1>
          <div className="flex items-center mt-2">
            <MapPinIcon className="h-5 w-5 text-primary-600 mr-2" />
            <span className="text-secondary-600">{property.location}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src={property.images[selectedImage]}
              alt={`${property.title} - Image ${selectedImage + 1}`}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {property.images.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-primary-600' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${property.title} - Thumbnail ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            {/* Main Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Property Details</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center p-4 bg-primary-50 rounded-lg">
                  <HomeIcon className="h-6 w-6 text-primary-600 mb-2" />
                  <span className="text-lg font-semibold">{property.bedrooms}</span>
                  <span className="text-sm text-secondary-500">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-primary-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span className="text-lg font-semibold">{property.bathrooms}</span>
                  <span className="text-sm text-secondary-500">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-primary-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span className="text-lg font-semibold">{property.area}</span>
                  <span className="text-sm text-secondary-500">sq ft</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">Description</h3>
                <p className="text-secondary-600">{property.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">Amenities</h3>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {property.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-2" />
                      <span className="text-secondary-600">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Availability */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Availability</h2>
              <div className="flex items-center mb-4">
                <CalendarIcon className="h-5 w-5 text-primary-600 mr-2" />
                <span className="text-secondary-600">
                  Available from {new Date(property.availableDates.start).toLocaleDateString()} to {new Date(property.availableDates.end).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center">
                {property.isAvailable ? (
                  <div className="flex items-center text-green-700">
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    <span>Available for booking</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-700">
                    <XCircleIcon className="h-5 w-5 mr-2" />
                    <span>Currently booked</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Owner Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">About the Owner</h2>
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg mr-4">
                  {property.owner.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-secondary-900">{property.owner.name}</p>
                  <p className="text-sm text-secondary-500">Property Owner</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-secondary-500">Response Rate</p>
                  <p className="font-semibold">{property.owner.responseRate}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Response Time</p>
                  <p className="font-semibold">{property.owner.responseTime}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">Contact</h3>
                <p className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${property.owner.email}`} className="text-primary-600 hover:text-primary-800">
                    {property.owner.email}
                  </a>
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${property.owner.phone}`} className="text-primary-600 hover:text-primary-800">
                    {property.owner.phone}
                  </a>
                </p>
              </div>
            </div>
            
            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Reviews</h2>
              
              {property.reviews.length > 0 ? (
                <div className="space-y-6">
                  {property.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-secondary-900">{review.userName}</p>
                          <p className="text-sm text-secondary-500">{new Date(review.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            i < review.rating ? (
                              <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
                            ) : (
                              <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                            )
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-secondary-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-secondary-500">No reviews yet.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <div className="flex items-center mb-4">
                <CurrencyDollarIcon className="h-6 w-6 text-primary-600 mr-2" />
                <span className="text-2xl font-bold text-secondary-900">${property.price}</span>
                <span className="text-secondary-500 ml-1">/month</span>
              </div>
              
              {property.isAvailable ? (
                <div>
                  {showBookingForm ? (
                    <form onSubmit={handleBookingSubmit}>
                      <div className="space-y-4 mb-4">
                        <div>
                          <label htmlFor="startDate" className="block text-sm font-medium text-secondary-700">
                            Move-in Date
                          </label>
                          <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="input mt-1"
                            min={property.availableDates.start}
                            max={property.availableDates.end}
                            value={bookingDates.startDate}
                            onChange={(e) => setBookingDates({...bookingDates, startDate: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="endDate" className="block text-sm font-medium text-secondary-700">
                            Move-out Date
                          </label>
                          <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="input mt-1"
                            min={bookingDates.startDate || property.availableDates.start}
                            max={property.availableDates.end}
                            value={bookingDates.endDate}
                            onChange={(e) => setBookingDates({...bookingDates, endDate: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          type="submit"
                          className="btn btn-primary flex-1"
                        >
                          Book Now
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setShowBookingForm(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      className="btn btn-primary w-full"
                      onClick={() => setShowBookingForm(true)}
                    >
                      Book This Property
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-4 bg-red-50 rounded-md mb-4">
                  <XCircleIcon className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <p className="text-sm text-red-700 font-medium mb-1">Currently Booked</p>
                  <p className="text-xs text-red-500">This property is not available for booking at the moment.</p>
                </div>
              )}
              
              <div className="mt-4">
                <button className="btn btn-secondary w-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share Property
                </button>
              </div>
              
              {/* Contact Owner Box */}
              <div className="mt-6 p-4 bg-primary-50 rounded-md">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">Contact the Owner</h3>
                <p className="text-sm text-secondary-600 mb-4">
                  Have questions about this property? Contact {property.owner.name} directly.
                </p>
                <a
                  href={`tel:${property.owner.phone}`}
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Owner
                </a>
                <a
                  href={`mailto:${property.owner.email}`}
                  className="btn btn-secondary w-full mt-2 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Owner
                </a>
              </div>
              
              {/* Safety Tips */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-md">
                <h3 className="text-sm font-semibold text-yellow-800 mb-2">Safety Tips</h3>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• Never wire money directly to a property owner</li>
                  <li>• Inspect the property before signing any agreement</li>
                  <li>• Verify the owner's identity and property ownership</li>
                  <li>• Report suspicious listings to our team</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
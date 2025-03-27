import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, HomeIcon, CurrencyDollarIcon, CalendarIcon } from '@heroicons/react/24/outline';

const PropertyCard = ({ property }) => {
  const {
    id,
    title,
    location,
    price,
    bedrooms,
    bathrooms,
    area,
    imageUrl,
    isAvailable,
  } = property;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <img 
          src={imageUrl || '/api/placeholder/400/200'} 
          alt={title}
          className="w-full h-52 object-cover"
        />
        {isAvailable ? (
          <span className="absolute top-4 right-4 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            Available
          </span>
        ) : (
          <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            Booked
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-secondary-900 truncate">{title}</h3>
        
        <div className="flex items-center mt-2 text-secondary-500">
          <MapPinIcon className="h-4 w-4 text-primary-600 mr-1" />
          <p className="text-sm truncate">{location}</p>
        </div>
        
        <div className="flex justify-between mt-4">
          <div className="flex items-center text-primary-700">
            <CurrencyDollarIcon className="h-5 w-5 mr-1" />
            <span className="font-bold">${price}</span>
            <span className="text-secondary-500 text-sm ml-1">/month</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between text-secondary-500 text-sm">
          <div className="flex items-center">
            <HomeIcon className="h-4 w-4 mr-1" />
            <span>{bedrooms} Beds</span>
          </div>
          <div>
            <span>{bathrooms} Baths</span>
          </div>
          <div>
            <span>{area} sqft</span>
          </div>
        </div>
        
        <Link 
          to={`/properties/${id}`} 
          className="block mt-4 text-center btn btn-primary w-full"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
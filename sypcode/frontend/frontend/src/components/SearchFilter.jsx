import React, { useState } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const SearchFilter = ({ onSearch, onFilterChange, initialFilters = {} }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || '');
  const [priceRange, setPriceRange] = useState([
    initialFilters.minPrice || 0,
    initialFilters.maxPrice || 5000
  ]);
  const [bedroomsFilter, setBedroomsFilter] = useState(initialFilters.bedrooms || 'any');
  const [availabilityFilter, setAvailabilityFilter] = useState(initialFilters.availability || 'all');

  const handleSearch = (e) => {
    e.preventDefault();
    
    onSearch({
      searchTerm,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      bedrooms: bedroomsFilter,
      availability: availabilityFilter
    });
  };

  const handleReset = () => {
    setSearchTerm('');
    setPriceRange([0, 5000]);
    setBedroomsFilter('any');
    setAvailabilityFilter('all');
    
    onFilterChange({
      searchTerm: '',
      minPrice: 0,
      maxPrice: 5000,
      bedrooms: 'any',
      availability: 'all'
    });
  };

  const handleFilterChange = (key, value) => {
    switch(key) {
      case 'searchTerm':
        setSearchTerm(value);
        break;
      case 'minPrice':
        setPriceRange([parseInt(value), priceRange[1]]);
        break;
      case 'maxPrice':
        setPriceRange([priceRange[0], parseInt(value)]);
        break;
      case 'bedrooms':
        setBedroomsFilter(value);
        break;
      case 'availability':
        setAvailabilityFilter(value);
        break;
      default:
        break;
    }

    // Send the updated filters to the parent component
    onFilterChange({
      searchTerm,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      bedrooms: bedroomsFilter,
      availability: availabilityFilter,
      [key]: value // Override with the new value
    });
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="flex">
          <div className="relative flex-grow">
            <input
              type="text"
              className="input pl-10 pr-4 py-3 w-full rounded-r-none"
              placeholder="Search by location or property name"
              value={searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-secondary-400" />
            </div>
          </div>
          <button 
            type="submit" 
            className="btn bg-primary-600 text-white hover:bg-primary-800 border border-primary-500 px-6 py-3 rounded-l-none"
          >
            Search
          </button>
          <button 
            type="button" 
            className="ml-2 btn bg-white text-primary-700 hover:bg-gray-100 border border-gray-300 px-3 py-3"
            onClick={() => setShowFilters(!showFilters)}
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
      
      {showFilters && (
        <div className="mt-4 p-4 bg-white rounded-md shadow-md">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Price Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="input w-full"
                />
                <span>to</span>
                <input
                  type="number"
                  min={priceRange[0]}
                  value={priceRange[1]}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="input w-full"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Bedrooms
              </label>
              <select
                value={bedroomsFilter}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                className="input w-full"
              >
                <option value="any">Any</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4+">4+ Bedrooms</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Availability
              </label>
              <select
                value={availabilityFilter}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
                className="input w-full"
              >
                <option value="all">All Properties</option>
                <option value="available">Available Only</option>
                <option value="booked">Booked Only</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary w-full"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
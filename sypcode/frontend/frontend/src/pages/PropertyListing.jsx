import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import PropertyCard from '../components/PropertyCard';

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [bedroomsFilter, setBedroomsFilter] = useState('any');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/properties');
        const result = await response.json();
        if (result.success) {
          const formatted = result.data.map((p) => ({
            id: p.id,
            title: p.title,
            location: `${p.city}, ${p.country}`,
            price: p.price,
            bedrooms: p.bedrooms,
            bathrooms: p.bathrooms,
            area: p.square_feet,
            imageUrl: p.images?.[0] ? `http://localhost:5000${p.images[0]}` : '/uploads/placeholder.jpg',
            isAvailable: true,
          }));
          setProperties(formatted);
          setFilteredProperties(formatted);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    let result = [...properties];

    if (searchTerm) {
      result = result.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    result = result.filter(property =>
      property.price >= priceRange[0] && property.price <= priceRange[1]
    );

    if (bedroomsFilter !== 'any') {
      if (bedroomsFilter === '4+') {
        result = result.filter(property => property.bedrooms >= 4);
      } else {
        result = result.filter(property => property.bedrooms === parseInt(bedroomsFilter, 10));
      }
    }

    if (availabilityFilter !== 'all') {
      const isAvailable = availabilityFilter === 'available';
      result = result.filter(property => property.isAvailable === isAvailable);
    }

    setFilteredProperties(result);
  }, [properties, searchTerm, priceRange, bedroomsFilter, availabilityFilter]);

  const handleReset = () => {
    setSearchTerm('');
    setPriceRange([0, 5000]);
    setBedroomsFilter('any');
    setAvailabilityFilter('all');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white">Find Your Perfect Property</h1>
          <p className="mt-2 text-primary-100">Browse through our extensive collection of properties</p>

          <form className="mt-6">
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  type="text"
                  className="input pl-10 pr-4 py-3 w-full rounded-r-none"
                  placeholder="Search by location or property name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value, 10), priceRange[1]])}
                      className="input w-full"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      min={priceRange[0]}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])}
                      className="input w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Bedrooms</label>
                  <select
                    value={bedroomsFilter}
                    onChange={(e) => setBedroomsFilter(e.target.value)}
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
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Availability</label>
                  <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
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
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-secondary-800">
                {filteredProperties.length} Properties Found
              </h2>
              <div>
                <select className="input">
                  <option>Sort by: Default</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-secondary-900">No properties found</h3>
                <p className="mt-2 text-secondary-500">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 btn btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListing;
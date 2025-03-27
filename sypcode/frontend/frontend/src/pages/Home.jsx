import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/properties');
        const data = await res.json();
        if (data.success) {
          setProperties(data.data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error('Failed to fetch properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary-700">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Find Your Perfect Home
            </h1>
            <p className="mt-6 text-xl text-white">
              Browse through our selection of premium apartments and houses available for rent.
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 flex">
              <div className="relative flex-grow">
                <input
                  type="text"
                  className="input pl-10 pr-4 py-3 w-full"
                  placeholder="Search by location or property name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-secondary-400" />
                </div>
              </div>
              <button className="ml-4 btn btn-primary px-6 py-3">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-secondary-900">Featured Properties</h2>
            <Link to="/properties" className="text-primary-600 hover:text-primary-800 font-medium">
              View All Properties
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}

              {filteredProperties.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-secondary-500 text-lg">No properties match your search criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Benefits/Features Section */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-primary-50 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Easy Property Search</h3>
              <p className="text-secondary-600">Find the perfect property with our advanced search filters and intuitive interface.</p>
            </div>
            
            <div className="p-6 bg-primary-50 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Real-Time Availability</h3>
              <p className="text-secondary-600">See property availability in real-time and book instantly without delays.</p>
            </div>
            
            <div className="p-6 bg-primary-50 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Direct Communication</h3>
              <p className="text-secondary-600">Connect directly with property owners for questions and negotiations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-primary-100 mb-8 max-w-3xl mx-auto">
            Whether you're looking to rent an apartment or list your property, we make the process simple and hassle-free.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/properties" className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-3">
              Browse Properties
            </Link>
            <Link to="/register" className="btn bg-primary-600 text-white hover:bg-primary-800 border border-primary-500 px-8 py-3">
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PencilIcon, 
  TrashIcon, 
  PlusIcon, 
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';



const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
  
        const response = await fetch('http://localhost:5000/api/properties/user/my-properties', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
  
        const result = await response.json();
        const formatted = result.data.map((p) => ({
          id: p.id,
          title: p.title,
          location: `${p.city}, ${p.country}`,
          price: p.price,
          bedrooms: p.bedrooms,
          bathrooms: p.bathrooms,
          area: p.square_feet,
          imageUrl: p.images?.[0] || '/api/placeholder/400/200',
          isAvailable: true, // you can improve this logic if you track availability
          bookings: 0, // update this if you have bookings data
          dateAdded: p.created_at || new Date().toISOString(),
        }));
  
        setProperties(formatted);
      } catch (err) {
        console.error('Error fetching properties:', err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProperties();
  }, []);
  

  const handleDelete = (propertyId) => {
    setPropertyToDelete(propertyId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!propertyToDelete) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/properties/${propertyToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      const result = await response.json();
  
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to delete property');
      }
  
      // Remove from UI
      setProperties(properties.filter(property => property.id !== propertyToDelete));
    } catch (err) {
      console.error('Error deleting property:', err.message);
      alert('Failed to delete the property. Please try again.');
    } finally {
      setShowDeleteModal(false);
      setPropertyToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPropertyToDelete(null);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-secondary-900">My Properties</h1>
        <Link
          to="/dashboard/add-property"
          className="btn btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Property
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : properties.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Bookings
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-16 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                          <img
                            src={property.imageUrl}
                            alt={property.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-secondary-900">{property.title}</div>
                          <div className="text-sm text-secondary-500">{property.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                      <div>{property.bedrooms} Beds • {property.bathrooms} Baths</div>
                      <div>{property.area} sqft</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-secondary-900">${property.price}</div>
                      <div className="text-sm text-secondary-500">per month</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.isAvailable ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Available
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Booked
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                      {property.bookings}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                      {new Date(property.dateAdded).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/properties/${property.id}`}
                          className="text-primary-600 hover:text-primary-900 p-1"
                          title="View Property"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </Link>
                        <Link
                          to={`/dashboard/edit-property/${property.id}`}
                          className="text-indigo-600 hover:text-indigo-900 p-1"
                          title="Edit Property"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete Property"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
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
          <h3 className="mt-4 text-xl font-medium text-secondary-900">No Properties Yet</h3>
          <p className="mt-2 text-secondary-500 max-w-md mx-auto">
            You haven't added any properties yet. Get started by adding your first property to the platform.
          </p>
          <div className="mt-6">
            <Link
              to="/dashboard/add-property"
              className="btn btn-primary"
            >
              Add Your First Property
            </Link>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-secondary-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <XCircleIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-secondary-900">
                      Delete Property
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-secondary-500">
                        Are you sure you want to delete this property? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-secondary-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProperties;
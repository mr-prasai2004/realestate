import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { propertyService } from '../../services/api'; // Import propertyService

const AddProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    square_feet: '',
    price: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'UK',
    amenities: [],
    availableFrom: '',
    availableTo: '',
    images: []
  });
  const [errors, setErrors] = useState({});
  const [previewImages, setPreviewImages] = useState([]);

  const amenitiesList = [
    'WiFi', 'Air Conditioning', 'Heating', 'Kitchen', 'TV', 'Parking',
    'Washing Machine', 'Elevator', 'Pool', 'Gym', 'Balcony', 'Garden',
    'Dishwasher', 'Pets Allowed'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setFormData({
          ...formData,
          amenities: [...formData.amenities, name]
        });
      } else {
        setFormData({
          ...formData,
          amenities: formData.amenities.filter(amenity => amenity !== name)
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      // Create image previews
      const newPreviewImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setPreviewImages([...previewImages, ...newPreviewImages]);
      setFormData({
        ...formData,
        images: [...formData.images, ...files]
      });
    }
  };

  const removeImage = (index) => {
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(previewImages[index].preview);
    
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
    
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      images: updatedImages
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.square_feet) {
      newErrors.square_feet = 'Area is required';
    } else if (isNaN(formData.square_feet) || formData.square_feet <= 0) {
      newErrors.square_feet = 'Area must be a positive number';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.availableFrom) {
      newErrors.availableFrom = 'Available from date is required';
    }
    
    if (!formData.availableTo) {
      newErrors.availableTo = 'Available to date is required';
    } else if (formData.availableFrom && new Date(formData.availableTo) <= new Date(formData.availableFrom)) {
      newErrors.availableTo = 'End date must be after start date';
    }
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // In AddProperty.jsx, update the handleSubmit function:

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  
    setLoading(true);
  
    try {
      const propertyData = new FormData();
  
      // Append fields with correct keys (snake_case where needed)
      propertyData.append('title', formData.title);
      propertyData.append('description', formData.description);
      propertyData.append('propertyType', formData.propertyType);
      propertyData.append('address', formData.address);
      propertyData.append('city', formData.city);
      propertyData.append('state', formData.state);
      propertyData.append('zip_code', formData.zip_code);
      propertyData.append('country', formData.country);
  
      // Convert numeric fields
      propertyData.append('price', Number(formData.price));
      propertyData.append('bedrooms', Number(formData.bedrooms));
      propertyData.append('bathrooms', Number(formData.bathrooms));
      propertyData.append('square_feet', Number(formData.square_feet));
  
      // Add availability dates using snake_case keys
      propertyData.append('available_from', formData.availableFrom);
      propertyData.append('available_to', formData.availableTo);
  
      // Amenities as a JSON string
      propertyData.append('amenities', JSON.stringify(formData.amenities));
  
      // Append each image
      formData.images.forEach((image) => {
        propertyData.append('images', image);
      });
  
      // Optional: log FormData entries
      for (let [key, value] of propertyData.entries()) {
        console.log(key, value);
      }
  
      // Submit to API
      const response = await propertyService.addProperty(propertyData);
  
      console.log('Property created:', response.data);
      navigate('/dashboard/my-properties');
    } catch (error) {
      console.error('Error creating property:', error);
  
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An error occurred while submitting the property. Please try again.';
  
      setErrors((prev) => ({
        ...prev,
        form: errorMessage,
      }));
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary-900">Add New Property</h1>
        <p className="text-secondary-600 mt-1">
          Fill in the details below to list your property.
        </p>
      </div>

      {errors.form && (
        <div className="mb-6 bg-red-50 p-4 rounded-md">
          <p className="text-sm text-red-700">{errors.form}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-secondary-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-secondary-700">
                Property Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`mt-1 input ${errors.title ? 'border-red-300' : ''}`}
                placeholder="e.g. Modern Apartment in City Center"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
            
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium text-secondary-700">
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="mt-1 input"
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="studio">Studio</option>
                <option value="condo">Condominium</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-secondary-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className={`mt-1 input ${errors.description ? 'border-red-300' : ''}`}
                placeholder="Describe your property in detail..."
              ></textarea>
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-secondary-900 mb-4">Property Details</h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-secondary-700">
                Bedrooms
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="mt-1 input"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-secondary-700">
                Bathrooms
              </label>
              <select
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="mt-1 input"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="square_feet" className="block text-sm font-medium text-secondary-700">
                Area (sqft) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="square_feet"
                name="square_feet"
                value={formData.square_feet}
                onChange={handleChange}
                className={`mt-1 input ${errors.square_feet ? 'border-red-300' : ''}`}
                placeholder="e.g. 1200"
                min="1"
              />
              {errors.square_feet && <p className="mt-1 text-sm text-red-600">{errors.square_feet}</p>}
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-secondary-700">
                Price (per month) <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-secondary-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`input pl-7 ${errors.price ? 'border-red-300' : ''}`}
                  placeholder="e.g. 1500"
                  min="1"
                />
              </div>
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Amenities
              </label>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-3 lg:grid-cols-4">
                {amenitiesList.map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <input
                      id={`amenity-${amenity}`}
                      name={amenity}
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-secondary-700">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-secondary-900 mb-4">Location</h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-secondary-700">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`mt-1 input ${errors.address ? 'border-red-300' : ''}`}
                placeholder="e.g. 123 Main Street"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-secondary-700">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`mt-1 input ${errors.city ? 'border-red-300' : ''}`}
                placeholder="e.g. London"
              />
              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
            </div>
            
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-secondary-700">
                State/Province
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 input"
                placeholder="e.g. Greater London"
              />
            </div>
            
            <div>
              <label htmlFor="zip_code" className="block text-sm font-medium text-secondary-700">
                Postal Code
              </label>
              <input
                type="text"
                id="zip_code"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleChange}
                className="mt-1 input"
                placeholder="e.g. SW1A 1AA"
              />
            </div>
            
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-secondary-700">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 input"
              >
                <option value="UK">United Kingdom</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
                <option value="ES">Spain</option>
                <option value="IT">Italy</option>
              </select>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-secondary-900 mb-4">Availability</h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="availableFrom" className="block text-sm font-medium text-secondary-700">
                Available From <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="availableFrom"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
                className={`mt-1 input ${errors.availableFrom ? 'border-red-300' : ''}`}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.availableFrom && <p className="mt-1 text-sm text-red-600">{errors.availableFrom}</p>}
            </div>
            
            <div>
              <label htmlFor="availableTo" className="block text-sm font-medium text-secondary-700">
                Available To <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="availableTo"
                name="availableTo"
                value={formData.availableTo}
                onChange={handleChange}
                className={`mt-1 input ${errors.availableTo ? 'border-red-300' : ''}`}
                min={formData.availableFrom || new Date().toISOString().split('T')[0]}
              />
              {errors.availableTo && <p className="mt-1 text-sm text-red-600">{errors.availableTo}</p>}
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-secondary-900 mb-4">Property Images</h2>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Upload Images <span className="text-red-500">*</span>
            </label>
            
            <div className="mb-4">
              <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${errors.images ? 'border-red-300' : 'border-gray-300'}`}>
                <div className="space-y-1 text-center">
                  <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-secondary-400" />
                  <div className="flex text-sm text-secondary-600">
                    <label
                      htmlFor="images"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Upload images</span>
                      <input
                        id="images"
                        name="images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-secondary-500">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </div>
              </div>
              {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
            </div>
            
            {previewImages.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-secondary-700 mb-2">Preview</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {previewImages.map((image, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden h-32">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                      >
                        <XMarkIcon className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="btn btn-secondary px-6"
            onClick={() => navigate('/dashboard/my-properties')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary px-6"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </div>
            ) : (
              'Add Property'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
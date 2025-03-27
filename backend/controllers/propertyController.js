// controller/propertyController.js - MySQL version
const Property = require('../models/Property');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/properties';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `property-${uniqueSuffix}${ext}`);
  }
});

// Filter for image files
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

// Set up multer upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB limit
  }
});

// Create a new property
exports.createProperty = async (req, res) => {
  console.log('📥 req.body:', req.body);
console.log('🖼️ req.files:', req.files);
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    // 🔍 Log what's coming in
    console.log('📦 req.body:', req.body);
    console.log('📸 req.files:', req.files);

    const {
      title = '',
      description = '',
      propertyType = '',
      bedrooms = 1,
      bathrooms = 1,
      square_feet = '',
      price = '',
      address = '',
      city = '',
      state = '',
      zip_code = '',
      country = '',
      available_from = '',
      available_to = ''
    } = req.body;

    let amenities = [];
    if (req.body.amenities) {
      try {
        amenities = JSON.parse(req.body.amenities);
      } catch {
        return res.status(400).json({ message: 'Invalid amenities format' });
      }
    }

    // ✅ Required field check
    const requiredFields = { title, description, square_feet, price, address, city, available_from, available_to };
    const missing = Object.entries(requiredFields)
      .filter(([key, val]) => !val || val.trim?.() === '')
      .map(([key]) => key);

    if (missing.length) {
      return res.status(400).json({ message: `Missing fields: ${missing.join(', ')}` });
    }

    // ✅ Image validation
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    const images = req.files.map(file => `/${file.path.replace(/\\/g, '/')}`);

    const propertyData = {
      title,
      description,
      propertyType,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      square_feet: Number(square_feet),
      price: Number(price),
      address,
      city,
      state,
      zip_code,
      country,
      available_from,
      available_to,
      amenities,
      images,
      owner_id: req.user.id
    };

    const newProperty = await Property.create(propertyData);

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: newProperty
    });
  } catch (error) {
    console.error('🔥 Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching properties',
      error: error.message
    });
  }
};

// Get a single property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching property',
      error: error.message
    });
  }
};

// Get properties by owner (for dashboard)
exports.getMyProperties = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'You must be logged in to view your properties'
      });
    }

    const properties = await Property.findByOwner(req.user.id);

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching your properties',
      error: error.message
    });
  }
};

// Update a property
exports.updateProperty = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'You must be logged in to update a property'
      });
    }

    // Find the property
    const property = await Property.findById(req.params.id);

    // Check if property exists
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if the user is the owner
    if (property.owner_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this property'
      });
    }

    // Parse amenities from JSON string to array if present
    let amenities = property.amenities;
    if (req.body.amenities) {
      try {
        amenities = JSON.parse(req.body.amenities);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Invalid amenities format'
        });
      }
    }

    // Process new images if uploaded
    let newImages = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        newImages.push(`/${file.path.replace(/\\/g, '/')}`);
      });
    }

    // Prepare update data
    const updateData = {
      title: req.body.title || property.title,
      description: req.body.description || property.description,
      propertyType: req.body.propertyType || property.property_type,
      bedrooms: req.body.bedrooms || property.bedrooms,
      bathrooms: req.body.bathrooms || property.bathrooms,
      square_feet: req.body.square_feet || property.square_feet,
      price: req.body.price || property.price,
      address: req.body.address || property.address,
      city: req.body.city || property.city,
      state: req.body.state || property.state,
      zip_code: req.body.zip_code || property.zip_code,
      country: req.body.country || property.country,
      amenities: amenities,
      available_from: req.body.available_from || property.available_from,
      available_to: req.body.available_to || property.available_to,
      newImages: newImages,
      // If images to delete were specified
      deleteImages: req.body.deleteImages ? JSON.parse(req.body.deleteImages) : []
    };

    // Update property in database
    const updatedProperty = await Property.update(req.params.id, updateData);

    // Delete any image files that were removed
    if (updateData.deleteImages && updateData.deleteImages.length > 0) {
      updateData.deleteImages.forEach(imagePath => {
        const fullPath = path.join(__dirname, '..', imagePath.replace(/^\//, ''));
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      data: updatedProperty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating property',
      error: error.message
    });
  }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'You must be logged in to delete a property'
      });
    }

    // Find the property
    const property = await Property.findById(req.params.id);

    // Check if property exists
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if the user is the owner
    if (property.owner_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this property'
      });
    }

    // Delete property and get list of image paths
    const imagePaths = await Property.delete(req.params.id);

    // Delete property images from the server
    imagePaths.forEach(imagePath => {
      const fullPath = path.join(__dirname, '..', imagePath.replace(/^\//, ''));
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting property',
      error: error.message
    });
  }
};

// Add this function to your propertyController.js file

// Check property availability
exports.checkAvailability = async (req, res) => {
  try {
    const { propertyId, startDate, endDate } = req.body;

    // Validate required fields
    if (!propertyId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide property ID, start date, and end date'
      });
    }

    // Parse dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validate date range
    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }

    // Find the property
    const property = await Property.findById(propertyId);

    // Check if property exists
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if property is available for the requested dates
    const propertyAvailableFrom = new Date(property.available_from);
    const propertyAvailableTo = new Date(property.available_to);

    // Check if requested dates are within property availability
    const isAvailable = 
      start >= propertyAvailableFrom && 
      end <= propertyAvailableTo;

    // TODO: In a real application, you would also check for existing bookings
    // that might conflict with the requested dates

    res.status(200).json({
      success: true,
      data: {
        isAvailable,
        property: {
          id: property.id,
          title: property.title,
          availableFrom: propertyAvailableFrom,
          availableTo: propertyAvailableTo
        }
      }
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking property availability',
      error: error.message
    });
  }
};

// Helper function to handle file uploads
exports.uploadPropertyImages = upload.array('images', 10); // Maximum 10 images
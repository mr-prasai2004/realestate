const { body, query, param, validationResult } = require('express-validator');

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation error', 
      errors: errors.array() 
    });
  }
  next();
};

/**
 * Validation rules for user registration
 */
const registerValidation = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  
  body('role')
    .optional()
    .isIn(['admin', 'owner', 'renter', 'guest']).withMessage('Invalid role'),
  
  handleValidationErrors
];

/**
 * Validation rules for user login
 */
const loginValidation = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address'),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
  
  handleValidationErrors
];

/**
 * Validation rules for property creation/update
 */
const propertyValidation = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 5, max: 255 }).withMessage('Title must be between 5 and 255 characters'),
  
  body('description')
    .notEmpty().withMessage('Description is required')
    .isString().withMessage('Description must be a string')
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
  
  body('address')
    .notEmpty().withMessage('Address is required')
    .isString().withMessage('Address must be a string'),
  
  body('city')
    .notEmpty().withMessage('City is required')
    .isString().withMessage('City must be a string'),
  
  body('price')
    .notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .custom((value) => value > 0).withMessage('Price must be greater than 0'),
  
  body('bedrooms')
    .optional()
    .isInt({ min: 0 }).withMessage('Bedrooms must be a non-negative integer'),
  
  body('bathrooms')
    .optional()
    .isNumeric().withMessage('Bathrooms must be a number')
    .custom((value) => value >= 0).withMessage('Bathrooms must be a non-negative number'),
  
  body('square_feet')
    .optional()
    .isInt({ min: 0 }).withMessage('Square feet must be a non-negative integer'),
  
  body('image_url')
    .optional()
    .isURL().withMessage('Image URL must be a valid URL'),
  
  handleValidationErrors
];

/**
 * Validation rules for booking creation
 */
const bookingValidation = [
  body('property_id')
    .notEmpty().withMessage('Property ID is required')
    .isInt({ min: 1 }).withMessage('Property ID must be a positive integer'),
  
  body('start_date')
    .notEmpty().withMessage('Start date is required')
    .isISO8601().withMessage('Start date must be a valid date')
    .custom((value) => new Date(value) >= new Date().setHours(0, 0, 0, 0))
    .withMessage('Start date cannot be in the past'),
  
  body('end_date')
    .notEmpty().withMessage('End date is required')
    .isISO8601().withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      return new Date(value) > new Date(req.body.start_date);
    })
    .withMessage('End date must be after start date'),
  
  body('message')
    .optional()
    .isString().withMessage('Message must be a string'),
  
  handleValidationErrors
];

/**
 * Validation rules for booking status update
 */
const bookingStatusValidation = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['pending', 'approved', 'rejected', 'cancelled']).withMessage('Invalid status value'),
  
  handleValidationErrors
];

/**
 * Validation rules for property filters
 */
const propertyFilterValidation = [
  query('city')
    .optional()
    .isString().withMessage('City must be a string'),
  
  query('minPrice')
    .optional()
    .isNumeric().withMessage('Minimum price must be a number')
    .custom((value) => value >= 0).withMessage('Minimum price must be non-negative'),
  
  query('maxPrice')
    .optional()
    .isNumeric().withMessage('Maximum price must be a number')
    .custom((value) => value >= 0).withMessage('Maximum price must be non-negative')
    .custom((value, { req }) => {
      return !req.query.minPrice || parseFloat(value) >= parseFloat(req.query.minPrice);
    })
    .withMessage('Maximum price must be greater than or equal to minimum price'),
  
  query('bedrooms')
    .optional()
    .isInt({ min: 1 }).withMessage('Bedrooms must be a positive integer'),
  
  query('bathrooms')
    .optional()
    .isNumeric().withMessage('Bathrooms must be a number')
    .custom((value) => value > 0).withMessage('Bathrooms must be a positive number'),
  
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  
  handleValidationErrors
];

/**
 * Validation rules for ID parameter
 */
const idParamValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  
  handleValidationErrors
];

module.exports = {
  registerValidation,
  loginValidation,
  propertyValidation,
  bookingValidation,
  bookingStatusValidation,
  propertyFilterValidation,
  idParamValidation,
  handleValidationErrors
};
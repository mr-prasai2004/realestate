const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const { testConnection } = require('./config/db');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Initialize express app
const app = express();

// Comprehensive CORS configuration
// Apply CORS middleware
app.use(cors());

// Handle preflight requests
app.options('*', cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving for uploads
app.use('/uploads', express.static('uploads'));

// Setup logging with Morgan
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Test database connection
testConnection();

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handling middleware (always at the end)
app.use(errorHandler);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Real Estate Management API!' });
});

// Create server
const server = app.listen(
  process.env.PORT || 5000, 
  () => console.log(`Server running on port ${process.env.PORT || 5000}`)
);

// Graceful shutdown and error handling
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  
  // Attempt to close the server and exit
  server.close(() => {
    console.log('Server closed');
    process.exit(1);
  });

  // Force exit if server doesn't close within 5 seconds
  setTimeout(() => {
    console.error('Could not close server, forcefully shutting down');
    process.exit(1);
  }, 5000);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  
  // Attempt to log the full error
  console.error(err);

  // Exit the process
  process.exit(1);
});

module.exports = app;
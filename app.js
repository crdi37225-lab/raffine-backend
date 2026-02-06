// app.js
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

// dotenv.config(); // Removed from here

const app = express();

// Body parser middleware
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

// User routes
app.use('/api/users', userRoutes);

const serviceRoutes = require('./routes/serviceRoutes');

// Vendor routes
app.use('/api/vendors', vendorRoutes);

const bookingRoutes = require('./routes/bookingRoutes');

// Service routes
app.use('/api/services', serviceRoutes);

const reviewRoutes = require('./routes/reviewRoutes');

// Booking routes
app.use('/api/bookings', bookingRoutes);

const adminRoutes = require('./routes/adminRoutes');

// Review routes
app.use('/api/reviews', reviewRoutes);

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger'); // Import the swagger spec

const paymentRoutes = require('./routes/paymentRoutes');

// Admin routes
app.use('/api/admin', adminRoutes);

const uploadsRoutes = require('./routes/uploadsRoutes'); // Import uploads routes

// Payment routes
app.use('/api/payments', paymentRoutes);

// Uploads routes
app.use('/api/uploads', uploadsRoutes);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
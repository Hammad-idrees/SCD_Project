// server.js

// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const xssClean = require('xss-clean');

// Import routes
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Import middlewares
const { authenticateToken } = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS
app.use(helmet()); // Set security headers
app.use(xssClean()); // Prevent XSS attacks

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully...'))
  .catch((err) => {
    console.error('Database connection error:', err.message);
    process.exit(1); // Exit process if DB connection fails
  });

// Routes
app.use('/api/auth', authRoutes); // Public route
app.use('/api/customers', authenticateToken, customerRoutes);
app.use('/api/products', authenticateToken, productRoutes);
app.use('/api/orders', authenticateToken, orderRoutes);
app.use('/api/cart', authenticateToken, cartRoutes);
app.use('/api/wishlist', authenticateToken, wishlistRoutes);
app.use('/api/reviews', authenticateToken, reviewRoutes);
app.use('/api/payments', authenticateToken, paymentRoutes);
app.use('/api/admin', authenticateToken, adminRoutes); // Secured admin routes

// Global error handling middleware
app.use(errorMiddleware); // Always put error middleware last

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown (production best practice)
process.on('SIGINT', () => {
  console.log('SIGINT received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed.');
      process.exit(0);
    });
  });
});

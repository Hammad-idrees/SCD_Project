// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const { createProduct, getAllProducts, getAllUsers, registerAdmin, loginAdmin } = require('../controllers/adminController');

// Admin register route (for registering an admin)
router.post('/register', registerAdmin);

// Admin login route (for logging in an admin)
router.post('/login', loginAdmin);

// Admin route to create a new product (requires authentication and admin role)
router.post('/products', authenticateToken, isAdmin, createProduct);

// Admin route to get all products (requires authentication and admin role)
router.get('/products', authenticateToken, isAdmin, getAllProducts);

// Admin route to get all users (requires authentication and admin role)
router.get('/users', authenticateToken, isAdmin, getAllUsers);

module.exports = router;
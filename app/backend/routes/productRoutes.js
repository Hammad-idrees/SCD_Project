const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct } = require('../controllers/productController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');  // Import both middlewares

// Get all products
router.get('/', getProducts);

// Get a single product by its ID
router.get('/:productId', getProductById);

// Admin route to create a new product (requires authentication and admin role)
router.post('/', authenticateToken, isAdmin, createProduct);  // Ensure both middlewares are applied

module.exports = router;

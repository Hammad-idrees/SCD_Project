// cartRoutes.js

const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');  // Correct import
const { authenticateToken } = require('../middleware/authMiddleware');  // Correct import

// Add a product to the cart (requires authentication)
router.post('/add', authenticateToken, addToCart);

// Remove a product from the cart (requires authentication)
router.delete('/remove/:productId', authenticateToken, removeFromCart);

// Get the current customer's cart (requires authentication)
router.get('/', authenticateToken, getCart);

module.exports = router;

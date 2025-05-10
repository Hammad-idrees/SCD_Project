const express = require('express');
const router = express.Router();
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlistController'); // Correct import
const { authenticateToken } = require('../middleware/authMiddleware'); // Correct middleware import

// Add a product to the wishlist (requires authentication)
router.post('/add', authenticateToken, addToWishlist);

// Remove a product from the wishlist (requires authentication)
router.delete('/remove/:productId', authenticateToken, removeFromWishlist);

// Get the current customer's wishlist (requires authentication)
router.get('/', authenticateToken, getWishlist);

module.exports = router;

const express = require('express');
const router = express.Router();
const { submitReview, getReviewsByProduct } = require('../controllers/reviewController');
const { authenticateToken } = require('../middleware/authMiddleware');  // Correct middleware import

// Add a review for a product (requires authentication)
router.post('/add', authenticateToken, submitReview);

// Get all reviews for a product by its ID
router.get('/:productId', getReviewsByProduct);

module.exports = router;

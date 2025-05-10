const express = require('express');
const router = express.Router();
const { createPayment, getPaymentByOrderId } = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/authMiddleware');  // Correct middleware import

// Create a payment for an order (requires authentication)
router.post('/', authenticateToken, createPayment);

// Get payment details by order ID (requires authentication)
router.get('/:orderId', authenticateToken, getPaymentByOrderId);

module.exports = router;

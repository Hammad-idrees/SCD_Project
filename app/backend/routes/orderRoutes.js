const express = require('express');
const router = express.Router();
const { placeOrder, getOrderById, getOrders } = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/authMiddleware');  // Corrected import

// Place a new order (requires authentication)
router.post('/', authenticateToken, placeOrder);

// Get an order by its ID (requires authentication)
router.get('/:orderId', authenticateToken, getOrderById);

// Get all orders placed by the logged-in customer (requires authentication)
router.get('/', authenticateToken, getOrders);

module.exports = router;

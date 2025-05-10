const express = require('express');
const router = express.Router();
const { getCustomerProfile, updateCustomerProfile } = require('../controllers/customerController');  // Ensure correct function names
const { authenticateToken } = require('../middleware/authMiddleware');  // Correct middleware import

// Get customer profile (requires authentication)
router.get('/profile', authenticateToken, getCustomerProfile);  // Corrected function name

// Update customer profile (requires authentication)
router.put('/profile', authenticateToken, updateCustomerProfile);  // Corrected function name

module.exports = router;

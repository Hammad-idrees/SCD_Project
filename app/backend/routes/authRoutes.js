// authRoutes.js

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Registration route (No authentication needed)
router.post('/register', register);

// Login route (No authentication needed, but will return a token after login)
router.post('/login', login);

module.exports = router;
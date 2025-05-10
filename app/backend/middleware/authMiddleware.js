// // middleware/authMiddleware.js

// const jwt = require('jsonwebtoken');

// // Middleware to authenticate user using JWT token
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.header('Authorization');
//   const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer TOKEN'

//   if (!token) {
//     return res.status(401).json({ message: 'Access Denied: No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach decoded user data to the request object
//     next(); // Proceed to the next middleware or route handler
//   } catch (err) {
//     console.error('Token verification failed:', err); // Log for debugging
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// module.exports = { authenticateToken };

// middleware/authMiddleware.js
// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to authenticate user using JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer TOKEN'

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with the secret key
    req.user = decoded; // Attach decoded user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Token verification failed:', err); // Log for debugging
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') { // Check if the user's role is 'admin'
    next(); // Proceed to the next middleware or route handler
  } else {
    return res.status(403).json({ message: 'Access Denied: You are not an admin' });
  }
};

module.exports = { authenticateToken, isAdmin };


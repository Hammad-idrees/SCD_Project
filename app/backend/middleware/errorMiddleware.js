const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace for debugging (in production, you may want to log it differently)

  // Determine error status and message
  const statusCode = err.statusCode || 500; // Default to 500 for server errors
  const message = err.message || 'Internal Server Error';

  // Send the error response to the client
  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack // Don't expose stack trace in production
  });
};

module.exports = errorMiddleware;

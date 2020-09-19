const ErrorHandler = require('../helpers/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  // log to console for dev
  console.error(err.stack.red);

  // mongoose bad objectid
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ErrorHandler(message, 404);
  }

  // mongoose duplicate object
  if (err.code === 11000) {
    const message = `Resource already exists.`;
    error = new ErrorHandler(message, 400);
  }

  // mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'an error occurred',
  });
};

module.exports = errorHandler;

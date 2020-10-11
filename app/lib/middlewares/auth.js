const jwt = require('jsonwebtoken');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../helpers/errorResponse');
const User = require('../../components/auth/auth_models');

exports.protects = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

   // make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }

  // verify user
  try {
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id);
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }
})
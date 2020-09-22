const crypto = require('crypto');
const asyncHandler = require('../../lib/middlewares/asyncHandler');
const User = require('../auth/auth_models');
const ErrorHandler = require('../../lib/helpers/errorResponse');

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({ name, email, password, role });
  sendTokenResponse(user, 200, res);
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // validate email and password
  if (!email || !password) {
    return next(new ErrorHandler('Please provide an email and password!', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid Credentials', 401));
  }

  // check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorHandler('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, data: user });
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJWT(); // create token

  res.status(statusCode).json({ token });
};

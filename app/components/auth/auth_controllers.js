const crypto = require('crypto');
const asyncHandler = require('../../lib/middlewares/asyncHandler');
const User = require('../auth/auth_models');

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({ name, email, password, role });
  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJWT(); // create token

  res.status(statusCode).json({ token });
};

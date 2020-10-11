const router = require('express').Router();
const { registerUser, loginUser, logout } = require('./auth_controllers');

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.post('/auth/logout', logout);

module.exports = router;

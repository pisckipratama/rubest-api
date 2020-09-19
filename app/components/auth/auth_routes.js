const router = require('express').Router();
const { registerUser } = require('./auth_controllers');

router.post('/register', registerUser);

module.exports = router;

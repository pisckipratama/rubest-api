const router = require('express').Router();
const { registerUser } = require('./user.controller');

router.get('/register', registerUser);

module.exports = router;
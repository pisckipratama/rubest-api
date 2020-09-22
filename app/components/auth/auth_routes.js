const router = require('express').Router();
const { registerUser, loginUser } = require('./auth_controllers');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;

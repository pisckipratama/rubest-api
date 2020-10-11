const express = require('express');
const router = express.Router();
const { getCashes, getCashById, addCash, updateCash, deleteCash } = require('./cashflow_controllers');
const { protects } = require('../../lib/middlewares/auth');

router.post('/cashes', protects, addCash);
router.get('/cashes', protects, getCashes);
router.get('/cashes/:id', protects, getCashById);
router.put('/cashes/:id', protects, updateCash);
router.delete('/cashes/:id', protects, deleteCash);

module.exports = router;
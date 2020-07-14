const router = require('express').Router();
const { getProducts, getProduct } = require('./users.controller');

router.get('/', getProducts);
router.get('/:id', getProduct)

module.exports = router;
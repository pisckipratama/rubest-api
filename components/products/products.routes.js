const router = require('express').Router();
const { getProducts, getProduct } = require('./products.controller');

router.get('/', getProducts);
router.get('/:id', getProduct)

module.exports = router;
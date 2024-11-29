const express = require('express');
const { addToCart } = require('../controller/CartProducts');
const { getCart } = require('../controller/Cart');

const { confirmOrder } = require('../controller/Order');


const router = express.Router();

router.get('/itemcart/:userId', getCart);
router.post('/add', addToCart);
router.post('/confirm-order', confirmOrder);




module.exports = router;
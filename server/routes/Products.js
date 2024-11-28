const express = require('express'); 
const { getFilteredProducts,incrementownercount, decrementownercount,updateproductbyId, createProduct} = require('../controller/Products'); 

const router = express.Router(); 

router.get('/', getFilteredProducts); 

router.post("/increment/:productId", incrementownercount);
router.post('/decrement/:productId', decrementownercount); // Decrement owner count
router.put('/:productId', updateproductbyId);
router.post('/create', createProduct);

module.exports = router;  
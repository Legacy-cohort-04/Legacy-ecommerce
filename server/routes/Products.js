const express = require('express'); 
const { getFilteredProducts,incrementownercount, decrementownercount,updateproductbyId, createProduct , getProducts} = require('../controller/Products'); 
const {} = require('../controller/Products')

const router = express.Router(); 

router.get('/', getFilteredProducts); 
router.get("/all", getProducts)
router.post("/increment/:productId", incrementownercount);
router.post('/decrement/:productId', decrementownercount); 
router.put('/:productId', updateproductbyId);
router.post('/create', createProduct);

module.exports = router;  
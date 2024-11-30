const express = require('express'); 
const { getFilteredProducts,updateproductbyId, createProduct , getProducts} = require('../controller/Products'); 
const {} = require('../controller/Products')

const router = express.Router(); 

router.get('/', getFilteredProducts); 
router.get("/all", getProducts)

router.put('/:productId', updateproductbyId);
router.post('/create', createProduct);

module.exports = router;  
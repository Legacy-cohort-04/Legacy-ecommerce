const express = require('express'); 
const { getFilteredProducts, updateproductbyId, createProduct, getProducts ,getProductbybrandverified,getProductsbystatus,searchProducts } = require('../controller/Products'); 

const router = express.Router(); 

router.get('/', getFilteredProducts); 
router.get('/verifiedbrands', getProductbybrandverified)
router.get('/', getProducts); 
router.get("/all", getProducts);
router.put('/:productId', updateproductbyId);
router.post('/create', createProduct);
router.get('/newdrops', getProductsbystatus);
router.get('/search', searchProducts);

module.exports = router;  
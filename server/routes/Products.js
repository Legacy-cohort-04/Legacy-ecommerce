const express = require('express'); 
<<<<<<< HEAD
const { getProducts,} = require('../controller/Products'); 

const router = express.Router(); 

router.get('/', getProducts); 



module.exports = router; 
=======
const { getFilteredProducts,incrementownercount, decrementownercount,updateproductbyId, createProduct} = require('../controller/Products'); 

const router = express.Router(); 

router.get('/', getFilteredProducts); 

router.post("/increment/:productId", incrementownercount);
router.post('/decrement/:productId', decrementownercount); // Decrement owner count
router.put('/:productId', updateproductbyId);
router.post('/create', createProduct);

module.exports = router;  
>>>>>>> 06bd3910547b6292c498c0e11a7d7240c7207ba2

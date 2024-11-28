const express = require('express'); 
const { getProducts,} = require('../controller/Products'); 

const router = express.Router(); 

router.get('/', getProducts); 



module.exports = router; 
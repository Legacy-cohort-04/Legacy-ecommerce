const express = require('express');
const router = express.Router();
const { addFavorite, getUserFavourites } = require('../controller/Favourites');

// Route to add a product to favorites
router.post('/user/:userId/add', addFavorite);

// Route to get user's favorite products
router.get('/user/:userId/favourites', getUserFavourites);

module.exports = router;
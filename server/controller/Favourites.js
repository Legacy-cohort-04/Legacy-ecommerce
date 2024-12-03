const db = require("../database/index");


// Function to add a product to favorites
const addFavorite = async (req, res) => {
    const userId = req.params.userId;
    const { productId } = req.body;

    try {
        // Check if the user already has a favorites entry
        let favorites = await db.Favourites.findOne({ where: { UserId: userId } });

        if (!favorites) {
            // Create a new favorites entry if it doesn't exist
            favorites = await db.Favourites.create({ UserId: userId });
        }
     
        // Check if the product is already in the user's favorites
        const existingFavoriteItem = await db.Favoriteitems.findOne({
            where: { FavouriteId: favorites.id, ProductId: productId }
        });

        if (existingFavoriteItem) {
            return res.status(400).json({ message: 'Product is already in favorites' });
        }

        // Add the product to the user's favorites
        const newFavoriteItem = await db.Favoriteitems.create({
            FavouriteId: favorites.id,
            ProductId: productId
        });

        res.status(201).json({ message: 'Product added to favorites', favoriteItem: newFavoriteItem });
    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to get user's favourite products
const getUserFavourites = async (req, res) => {
    const userId = req.params.userId;

    try {
        const favorites = await db.Favourites.findOne({
            where: {UserId :  userId },
            include: [{ model: db.Products ,as: "products"}]
        });

        if (!favorites) {
            return res.status(404).json({ message: 'No favorites found' });
        }

        res.json(favorites);
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addFavorite, getUserFavourites };

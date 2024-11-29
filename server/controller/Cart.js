const db = require("../database/index");

const getCart = (req, res) => {
    // Extract UserId from request parameters
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    db.Cart.findOne({
        where: { UserId: userId },
        include: [{
            model: db.Products,
            attributes: ['id', 'title', 'price', 'image'],
            through: { 
                attributes: ['quantity', 'priceAtPurchase'],
                as: 'CartProducts'
            }
        }]
    })
    .then(cart => {
        if (!cart) {
            return res.status(200).json({
                totalItems: 0,
                totalAmount: 0,
                products: []
            });
        }

        // Format the response to include total items and amount
        const formattedCart = {
            totalItems: cart.totalItems,
            totalAmount: cart.totalAmount,
            products: cart.Products.map(product => ({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: product.CartProducts.quantity,
                priceAtPurchase: product.CartProducts.priceAtPurchase
            }))
        };

        res.status(200).json(formattedCart);
    })
    .catch(error => {
        console.error("Database error:", error);
        res.status(500).json({ message: "Error retrieving cart" });
    });
}

module.exports = { getCart };




// const db = require("../database/index")
// const jwt = require('jsonwebtoken')

// const getCart = (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1]
    
//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized" })
//     }

//     const userId = decoded.id
    
//     db.Cart.findOne({
//         where: { UserId: userId },
//         include: [{
//             model: db.Products,
//             attributes: ['id', 'title', 'price', 'image'],
//             through: { 
//                 attributes: ['quantity', 'priceAtPurchase'],
//                 as: 'CartProducts'
//             }
//         }]
//     })
//     .then(cart => {
//         if (!cart) {
//             return res.status(200).json({
//                 totalItems: 0,
//                 totalAmount: 0,
//                 products: []
//             })
//         }
//         res.status(200).json(cart)
//     })
//     .catch(error => {
//         console.error(error)
//         res.status(500).json({ message: "Error retrieving cart" })
//     })
// }

// module.exports = { getCart }
const db = require("../database/index")
const jwt = require('jsonwebtoken')

const getCart = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    let decoded;
    try {
        decoded = jwt.verify(token, 'ascefbth,plnihcdxuwy')
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }

    const userId = decoded.id
    
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
            })
        }
        res.status(200).json(cart)
    })
    .catch(error => {
        console.error("Errori fetching cart:", error)
        res.status(500).json({ message: "Error retrieving cart" })
    })
}

module.exports = { getCart }
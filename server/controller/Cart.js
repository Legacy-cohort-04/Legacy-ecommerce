const db = require("../database/index")

const getCart = (req, res) => {
    const userId = req.params.userId;

    db.Cart.findOne({
        where: { UserId: userId },
        include: [{
            model: db.Products,
            attributes: ['id', 'title', 'price' , 'image'],
            through: { 
                attributes: ['quantity'],
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
        res.status(200).json(cart);
    })
    .catch(error => {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Error retrieving cart" });
    });
};


module.exports = { getCart }




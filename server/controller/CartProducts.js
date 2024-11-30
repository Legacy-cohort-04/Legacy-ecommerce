const db = require('../database')
const jwt = require('jsonwebtoken')

function decodeToken(req, res) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    return jwt.verify(token, 'ascefbth,plnihcdxuwy')
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

exports.addToCart = (req, res) => {
  const decoded = decodeToken(req, res)
  if (!decoded) return

  const { productId } = req.body

  db.Products.findOne({ where: { id: productId } })
    .then(product => {
      if (!product) return res.status(404).json({ message: 'Product not found' })

      db.Cart.findOrCreate({ where: { UserId: decoded.id }, defaults: { totalItems: 0, totalAmount: 0 } })
        .then(([cart]) => {
          db.CartProducts.findOrCreate({ 
            where: { CartId: cart.id, ProductId: productId }, 
            defaults: { quantity: product.price} 
          }).then(([cartProduct, created]) => {
            if (!created) cartProduct.quantity++
            cart.totalItems++
            cart.totalAmount = parseFloat(cart.totalAmount) + parseFloat(product.price)
            cartProduct.save()
            cart.save()
            res.status(200).json({ message: 'Product added to cart' })
          })
        })
    })
    .catch(() => res.status(500).json({ message: 'Error adding product to cart' }))
}
 

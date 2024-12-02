const { Op } = require("sequelize");
const { Products, Brands } = require("../database/index");

const getProductbybrandverified = async (req, res) => {
  try {
    const products = await Products.findAll({
      where: { 
        status: 'Available' 
      },
      include: [
        {
          model: Brands,
          where: { verified: 1 }
        }
      ]
    });
    
    if (products.length === 0) {
      return res.status(404).json({ 
        message: "No verified products found." 
      });
    }
    res.json(products);
  } catch (error) {
    console.error("Error fetching verified products:", error);
    res.status(500).json({ 
      message: "Failed to fetch verified products",
      error: error.message 
    });
  }
};


const getFilteredProducts = (req, res) => {
  const { category, priceRange, rarity, status, onSale, chains, sort } = req.query;

  Products

    .findAll({
      where: {
        ...(category && { collection: category }),
        ...(rarity && { rarity }),
        ...(status && { status }),
        ...(chains && { chains: { [Op.like]: `%${chains}%` } }) ,
        ...(onSale === "true" && { onSale: true }),
        ...(priceRange && (() => {
          const [minPrice, maxPrice] = priceRange.split("-").map(Number);
          const priceConditions = {};
          if (!isNaN(minPrice)) {
            priceConditions[Op.gte] = minPrice;
          }
          if (!isNaN(maxPrice)) {
            priceConditions[Op.lte] = maxPrice;
          }
          return { price: priceConditions };
        })()),
      },
      order: [
        ...(sort === "price_asc" ? [["price", "ASC"]] : []),
        ...(sort === "price_desc" ? [["price", "DESC"]] : []),
        ...(sort === "newest" ? [["createdAt", "DESC"]] : []),
      ],
    })
    .then((filteredProducts) => {
      console.log("Filtered products:", filteredProducts);
      res.json(filteredProducts);
    })
    .catch((error) => {
      console.error("Error retrieving products:", error);
      res.status(500).json({ message: "Error retrieving products." });
    });
};



const updateproductbyId = async (req, res) => {
  const productId = req.params.productId; 
  const { price } = req.body; 

  try {
    const [updated] = await db.Products.update(
      { price },
      { where: { id: productId } } 
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product updated successfully." });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Failed to update product");
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      image,
      status,
      rarity,
      chains,
      collection,
      stock = 0,
      onSale = false,
    } = req.body;

    console.log('Received data:', req.body); 

    if (!title || !price || !image || !rarity || !chains || !collection) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        receivedData: req.body,
      });
    }

    const product = await Products.create({
      title: title.trim(),
      price: parseFloat(price),
      image: image.trim(),
      status: status || "Available",
      rarity: rarity.trim(),
      chains: chains.trim(),
      collection: collection.trim(),
      stock: parseInt(stock),
      onSale: Boolean(onSale),
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error creating product",
      receivedData: req.body,
    });
  }
};




const getProducts = async (req, res) => {
  try {
    const allProducts = await Products.findAll(); 
    res.json(allProducts); 
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Error retrieving products." });
  }
};



const getProductsbystatus = async (req, res) => {
  try {
    const products = await Products.findAll({
      where: { 
        status: 'New'
      }
    });
    
    res.json(products);
  } catch (error) {
    console.error("Error fetching new products:", error);
    res.status(500).json({ 
      message: "Failed to fetch new products",
      error: error.message 
    });
  }
};

module.exports = {
  getProducts,
  getFilteredProducts,
  getProductbybrandverified,
  updateproductbyId,
  createProduct,
  getProductsbystatus
};
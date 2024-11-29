
const { Op } = require("sequelize");
const { Products } = require("../database/index");

const getProductbybrandverified = async (req, res) => {
  const brandId = req.params.brandId; 

  try {
    const products = await db.Products.findAll({
      where: { brandId, verified: true }, 
      include: [
        {
          model: db.Brands,
          attributes: ["id", "name"],
        },
      ],
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No verified products found for this brand." });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching verified products by brand ID:", error);
    res.status(500).send("Failed to fetch verified products");
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

const incrementownercount = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await db.Products.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const brandId = product.brandId;

    await db.Brands.increment("owner", { where: { id: brandId } });

    res.status(200).json({ message: "Owner count incremented successfully." });
  } catch (error) {
    console.error("Error incrementing owner count:", error);
    res.status(500).send("Failed to increment owner count");
  }
};

const decrementownercount = async (req, res) => {
  const { productId } = req.params; 

  try {
    const product = await db.Products.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const brandId = product.brandId; 

    await db.brands.decrement("owner", { where: { id: brandId } });

    res.status(200).json({ message: "Owner count decremented successfully." });
  } catch (error) {
    console.error("Error decrementing owner count:", error);
    res.status(500).send("Failed to decrement owner count");
  }
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

    if (!title || !price || !image || !rarity || !chains || !collection) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        receivedData: req.body,
      });
    }

    const product = await db.Products.create({
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
      message: "Error creating product",
      error: error.message,
      receivedData: req.body, 
    });
  }
};




const getProducts = async (req, res) => {
  try {
    const allProducts = await products.findAll();
    res.json(allProducts); 
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Error retrieving products." });
  }
};

// const getProductbybrandverified = async (req, res) => {
//     const brandId = req.params.brandId; 
  
//     try {
//       const products = await db.Products.findAll({
//         where: { brandId, verified: true }, 
//         include: [
//           {
//             model: db.  Brands,
//             attributes: ["id", "name"],
//           },
//         ],
//       });
  
//       if (products.length === 0) {
//         return res
//           .status(404)
//           .json({ message: "No verified products found for this brand." });
//       }
  
//       res.json(products);
//     } catch (error) {
//       console.error("Error fetching verified products by brand ID:", error);
//       res.status(500).send("Failed to fetch verified products");
//     }
//   };


module.exports = {
  getProducts,
  getFilteredProducts,
  // getProductbybrandverified,
  incrementownercount,
  decrementownercount,
  updateproductbyId,
  createProduct,
};
const db = require("../database/index");

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
    // getProductbybrandverified
  };
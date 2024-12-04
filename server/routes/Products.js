const express = require("express");
const {
  getFilteredProducts,
  updateproductbyId,
  createProduct,
  getProducts,
  getProductbybrandverified,
  getProductsbystatus,
  deleteProductbyId,
  getProductsbyBrandId,
} = require("../controller/Products");

const router = express.Router();

router.get("/", getFilteredProducts);
router.get("/verifiedbrands", getProductbybrandverified);
router;
router.get("/", getProducts);
router.get("/all", getProducts);
router.get("/:brandId", getProductsbyBrandId);
router.put("/:productId", updateproductbyId);
router.post("/create", createProduct);
router.get("/status/new", getProductsbystatus);
router.delete("/:productId", deleteProductbyId);

module.exports = router;

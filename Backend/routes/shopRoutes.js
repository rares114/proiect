const express = require("express");
const router = express.Router();
const {
  updateShopInfo,
  addOrUpdateProduct,
  fetchShopProducts,
  searchProduct,
  removeProduct,
  getShopById,
} = require("../controllers/shopController");
const { protect } = require("../middleware/authMiddleware");

router.post("/me", protect, updateShopInfo);
router.post("/product", protect, addOrUpdateProduct);
router.delete("/productREM", protect, removeProduct)
router.get("/shopproducts", protect, fetchShopProducts);
router.get("/product/search/:search", searchProduct);
router.get("/:shopId", getShopById);

module.exports = router;

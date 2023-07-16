const express = require("express");
const router = express.Router();
const {
  updateShopInfo,
  addOrUpdateProduct,
  fetchShopProducts,
  searchProduct,
} = require("../controllers/shopController");
const { protect } = require("../middleware/authMiddleware");

router.post("/me", protect, updateShopInfo);
router.post("/product", protect, addOrUpdateProduct);
router.get("/shopproducts", protect, fetchShopProducts);
router.get("/product/search/:search", searchProduct);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  updateShopInfo,
  addOrUpdateProduct,
} = require("../controllers/shopController");
const { protect } = require("../middleware/authMiddleware");

router.post("/me", protect, updateShopInfo);
router.post("/product", protect, addOrUpdateProduct);

module.exports = router;

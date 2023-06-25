const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.use("/users", require("./userRoutes"));
router.use("/shops", require("./shopRoutes"));

module.exports = router;

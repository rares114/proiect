const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const executeQuery = require("../config/db");

// @desc    Register a shop
// @route   POST /shops
// @access  Protected (assuming only authenticated users can register a shop)

const updateShopInfo = asyncHandler(async (req, res) => {
  try {
    if (req.user.isshop !== 1) {
      res.status(400);
      throw "User is not a shop";
    }

    const userID = req.user.id;
    const { shopName, email, address, phone, description } = req.body;

    await executeQuery(`INSERT INTO shops (id, name, address, phone) VALUES(${userID}, "${shopName}", "${address}", "${phone}") ON DUPLICATE KEY UPDATE    
    name="${shopName}", address="${address}", phone="${phone}"`);

    const response = {
      shopName: shopName,
      address: address,
      phone: phone,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error registering shop:", error);
    throw error;
  }
});

const addOrUpdateProduct = asyncHandler(async (req, res) => {
  try {
    if (req.user.isshop !== 1) {
      res.status(400);
      throw "User is not a shop";
    }

    const userID = req.user.id;
    const { name, quantity, um } = req.body;

    await executeQuery(`INSERT INTO products (shop, name, quantity, um) VALUES(${userID}, "${name}", ${quantity}, "${um}") ON DUPLICATE KEY UPDATE    
    name="${name}", quantity=${quantity}, um="${um}"`);

    const response = {};
    res.status(200).json(response);
  } catch (error) {
    console.error("Error registering shop:", error);
    throw error;
  }
});

module.exports = {
  updateShopInfo,
  addOrUpdateProduct,
};

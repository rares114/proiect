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
    const { shopName, email, address, phone, schedule, description } = req.body;

    await executeQuery(`INSERT INTO shops (id, name, email, address, phone, schedule, description) VALUES(${userID}, "${shopName}", "${email}", "${address}", "${phone}", "${schedule}", "${description}") ON DUPLICATE KEY UPDATE    
    name="${shopName}", email="${email}", address="${address}", phone="${phone}", schedule="${schedule}", description="${description}"`);

    const response = {
      shopName: shopName,
      email: email,
      address: address,
      phone: phone,
      schedule: schedule,
      description: description,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error updating shop:", error);
    throw error;
  }
});

const searchProduct = asyncHandler(async (req, res) => {
  try {
    const search = req.params.search;
    const searchShopByProducts = `SELECT address FROM shops WHERE id IN (SELECT shop FROM products WHERE name LIKE '%${search}%')`;
    const shops = await executeQuery(searchShopByProducts);
    res.status(200).json(shops[0]);
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
    const { name, quantity, um, price } = req.body;

    await executeQuery(`INSERT INTO products (shop, name, quantity, um, price) VALUES(${userID}, "${name}", "${quantity}", "${um}", "${price}") ON DUPLICATE KEY UPDATE    
    name="${name}", quantity=${quantity}, um="${um}", price="${price}"`);

    const response = {};
    res.status(200).json(response);
  } catch (error) {
    console.error("Error registering shop:", error);
    throw error;
  }
});

const fetchShopProducts = asyncHandler(async (req, res) => {
  try {
    const userID = req.user.id;
    const query = `SELECT * FROM products WHERE shop = ${userID}`;

    const products = await executeQuery(query);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
});

module.exports = {
  updateShopInfo,
  addOrUpdateProduct,
  fetchShopProducts,
  searchProduct,
};

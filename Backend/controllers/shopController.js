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
    const searchShopByProducts = `SELECT address, name FROM shops WHERE id IN (SELECT shop FROM products WHERE name LIKE '%${search}%')`;
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
    const query = `
      SELECT p.*, s.name AS shop_name
      FROM products p
      INNER JOIN shops s ON p.shop = s.id
      WHERE p.shop = ${userID}
    `;

    const products = await executeQuery(query);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    if (req.user.isshop !== 1) {
      res.status(400);
      throw "User is not a shop";
    }

    const userID = req.user.id;
    const name = req.body.productId;

    const deleteQuery = `DELETE FROM products WHERE name="${name}" AND shop="${userID}"`;
    await executeQuery(deleteQuery);

    const response = { message: `Product has been deleted.` };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
});

const getShopById = asyncHandler(async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const query = "SELECT * FROM shops WHERE id = ?";
    const [rows] = await executeQuery(query, [shopId]);

    if (rows.length === 0) {
      res.status(404);
      throw new Error("Shop not found");
    }

    const shopData = rows[0];
    res.status(200).json(shopData);
  } catch (error) {
    console.error("Error fetching shop information:", error);
    throw error;
  }
});

module.exports = {
  updateShopInfo,
  addOrUpdateProduct,
  fetchShopProducts,
  searchProduct,
  removeProduct,
  getShopById,
};

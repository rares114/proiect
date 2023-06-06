const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const mysql = require("mysql2/promise");
const Shop = require("../models/shopModel");

// @desc    Register a shop
// @route   POST /shops
// @access  Protected (assuming only authenticated users can register a shop)

const registerShop = asyncHandler(async (req, res) => {
  const { name, email, address, phone, description } = req.body;

  // Validate the required fields
  if (!name || !email || !address || !phone ) {
    res.status(400);
    throw new Error("Please fill in all the required fields");
  }

  try {
    // Check if shop with the given email already exists
    const existingShop = await Shop.findOne({ email });

    if (existingShop) {
      res.status(400);
      throw new Error("Shop with this email already exists");
    }

    // Create a new shop object
    const shop = new Shop({
      name,
      email,
      address,
      phone,
      description,
    });

    // Save the shop to the database
    const createdShop = await shop.save();

    res.status(201).json(createdShop);
  } catch (error) {
    console.error("Error registering shop:", error);
    throw error;
  }
});

module.exports = {
  registerShop,
};

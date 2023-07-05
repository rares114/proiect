const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const mysql = require("mysql2/promise");
const executeQuery = require("../config/db");

// @desc    Register new user
// @route   POST /users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, isshop } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please fill the name field");
  }

  if (!email) {
    res.status(400);
    throw new Error("Please fill the email field");
  }

  if (!password) {
    res.status(400);
    throw new Error("Please fill the password field");
  }

  if (typeof isshop === "undefined") {
    res.status(400);
    throw new Error("Please fill the isshop field");
  }

  try {
    const [rows] = await executeQuery("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      res.status(400);
      throw new Error("Email is already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [insertResult] = await executeQuery(
      "INSERT INTO users (name, email, password, isshop) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, isshop]
    );

    if (insertResult.affectedRows === 1) {
      const user = {
        id: insertResult.insertId,
        name,
        email,
      };

      res.status(201).json({
        ...user,
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  } finally {
    connection.end();
  }
});

// @desc    Authenticate a user
// @route   POST /users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await executeQuery("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400);
      throw new Error("Invalid credentials");
    } else {
      const response = {
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
        isshop: user.isshop,
      };

      res.status(200).json(response);
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  } finally {
    connection.end();
  }
});

// @desc    Get user data
// @route   POST /users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const query = `SELECT * FROM products`;

    const products = await executeQuery(query);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  fetchAllProducts,
};

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const mysql = require("mysql2/promise");


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
  
  if (!phone) {
    res.status(400);
    throw new Error("Please fill the phone field");
  }
  
  if (typeof isshop === 'undefined') {
    res.status(400);
    throw new Error("Please fill the isshop field");
  }
  
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testing'
  });

  try {
    // Check if user exists
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
      res.status(400);
      throw new Error("Email is already in use");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user data into the database
    const [insertResult] = await connection.execute('INSERT INTO users (name, email, password, phone, isshop) VALUES (?, ?, ?, ?, ?)', [name, email, hashedPassword, phone, isshop]);

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
    console.error('Error registering user:', error);
    throw error;
  } finally {
    // Close the database connection
    connection.end();
  }
});

// @desc    Authenticate a user
// @route   POST /users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Create a database connection and execute the query
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testing",
  });

  try {
    // Check if user exists
    const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    const user = rows[0];
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    const response = {
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
      isshop: user.isshop // Include the isShop value if available
    };

    if (!passwordMatch) {
      res.status(400);
      throw new Error("Invalid credentials");
    } else {
      // Authentication successful
      res.status(200).json(response);
    }

  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  } finally {
    // Close the database connection
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


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};

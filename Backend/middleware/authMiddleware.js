const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const executeQuery = require("../config/db");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      // -password ignores the password and retrieves all other fields
      //req.user = await User.findById(decoded.id).select("-password");

      const [rows] = await executeQuery("SELECT * FROM users WHERE id = ?", [
        decoded.id,
      ]);

      if (rows.length === 0) {
        throw new Error("Invalid token");
      }

      req.user = rows[0];

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };

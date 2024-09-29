const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  // Check for authorization header
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // Extract token from the 'Bearer <token>' format
  const token = authorization.split(" ")[1];

  try {
    // Verify JWT token
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Find user by _id
    req.user = await User.findOne({ _id }).select("_id");

    if (!req.user) {
      return res.status(401).json({ error: "User not found" });
    }

    next();
  } catch (err) {
    // Handle JWT errors (e.g., token expired, invalid token)
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Generic error handling for other cases
    console.error(err); // Log the detailed error on the server
    res.status(500).json({ error: "Authentication failed" });
  }
};

module.exports = requireAuth;

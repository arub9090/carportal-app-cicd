const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireSignin = async (req, res, next) => {
  let token = req.cookies.token;

  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from token
      req.user = await User.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
    }
  }

  if (!token) {
    res.status(400).json("Not Authorized");
  }
};

module.exports = { requireSignin };

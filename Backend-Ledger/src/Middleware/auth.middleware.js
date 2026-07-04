const userModel = require("../models/user.model");
const tokenBlacklistModel = require("../models/blackList.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const isBlacklisted = await tokenBlacklistModel.findOne({ token });

  if (isBlacklisted) {
    return res
      .status(401)
      .json({ message: "Unauthorized access. Token is invalid." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
}

async function authSystemUserMiddleware(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const isBlacklisted = await tokenBlacklistModel.findOne({ token });

  if (isBlacklisted) {
    return res
      .status(401)
      .json({ message: "Unauthorized access. Token is invalid." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId).select("+systemUser");

    if (!user.systemUser) {
      return res.status(403).json({
        message: "Access denied. Only system users can perform this action.",
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
}

module.exports = { authMiddleware, authSystemUserMiddleware };

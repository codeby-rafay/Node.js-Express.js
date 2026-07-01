const express = require("express");
const { authMiddleware } = require("../Middleware/auth.middleware");
const {
  createAccountController,
} = require("../controllers/account.controller");

const router = express.Router();

/**
 * - POST /api/accounts
 * - Create a new account.
 * - Protected route.
 */
router.post("/", authMiddleware, createAccountController);

module.exports = router;

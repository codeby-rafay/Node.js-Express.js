const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const {
  createAccountController,
  getUserAccountsController,
} = require("../controllers/account.controller");

const router = express.Router();

/**
 * - POST /api/accounts
 * - Create a new account.
 * - Protected route.
 */
router.post("/", authMiddleware, createAccountController);

/**
 * - GET /api/accounts
 * - Retrieve all accounts.
 * - Protected route.
 */
router.get("/", authMiddleware, getUserAccountsController);

module.exports = router;

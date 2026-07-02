const accountModel = require("../models/account.model");

async function createAccountController(req, res) {
  const user = req.user;
  const account = await accountModel.create({ user: user._id });
  return res
    .status(201)
    .json({ message: "Account created successfully", account });
}

async function getUserAccountsController(req, res) {
  const user = req.user;
  const accounts = await accountModel.find({ user: user._id });
  return res.status(200).json({ accounts });
}

module.exports = { createAccountController, getUserAccountsController };

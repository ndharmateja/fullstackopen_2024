const express = require("express");
const { loginCreateToken } = require("../controllers/login");

// Create router
const loginRouter = express.Router();

// Route /api/login
loginRouter.post("/", loginCreateToken);

module.exports = loginRouter;

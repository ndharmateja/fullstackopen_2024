const express = require("express");
const { getAllUsers, createUser } = require("../controllers/users");

// Create router
const usersRouter = express.Router();

// Route /api/users
usersRouter.route("/").get(getAllUsers).post(createUser);

// Route /api/users/:id
usersRouter.route("/:id");

module.exports = usersRouter;

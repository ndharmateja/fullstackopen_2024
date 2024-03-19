const express = require("express");
const {
    getAllUsers,
    createUser,
    getOneUser,
    updateUser,
    deleteUser,
} = require("../controllers/users");

// Create router
const usersRouter = express.Router();

// Route /api/users
usersRouter.route("/").get(getAllUsers).post(createUser);

// Route /api/users/:id
usersRouter.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = usersRouter;

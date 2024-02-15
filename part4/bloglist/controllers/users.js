const bcrypt = require("bcrypt");
const User = require("../models/User");
const BlogAppError = require("../errors/BlogAppError");

const getAllUsers = async (_req, res) => {
    const users = await User.find({});
    return res.json(users);
};

const createUser = async (req, res) => {
    const { username, name, password } = req.body;

    // If password is missing or less than 3 chars, throw error
    if (!password) throw new BlogAppError(400, "`password` is required");
    if (password.length < 3)
        throw new BlogAppError(400, "`password` should be atleast 3 chars");

    // create hash
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // create User
    const user = new User({ username, name, passwordHash });
    const savedUser = await user.save();

    return res.status(201).json(savedUser);
};

const getOneUser = async (req, res) => {
    const userId = req.params.id;
    return res.json({ userId, route: "get one user" });
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    return res.json({ userId, route: "delete one user" });
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    return res.json({ userId, route: "update one user" });
};

module.exports = {
    getAllUsers,
    createUser,
    getOneUser,
    updateUser,
    deleteUser,
};

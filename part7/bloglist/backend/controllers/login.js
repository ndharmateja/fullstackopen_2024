const bcrypt = require("bcrypt");
const User = require("../models/User");
const BlogAppError = require("../errors/BlogAppError");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const loginCreateToken = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        throw new BlogAppError(400, "username and password required");

    const user = await User.findOne({ username });
    if (user === null) throw new BlogAppError(401, "invalid username");

    if (!(await bcrypt.compare(password, user.passwordHash)))
        throw new BlogAppError(401, "invalid password");

    const userForToken = {
        username,
        id: user.id,
    };
    const token = jwt.sign(userForToken, config.SECRET);

    return res.status(200).json({ token, username, name: user.name });
};

module.exports = { loginCreateToken };

const getAllUsers = async (_req, res) => {
    return res.json({ route: "get all users" });
};

const createUser = async (_req, res) => {
    return res.json({ route: "create user" });
};

module.exports = { getAllUsers, createUser };

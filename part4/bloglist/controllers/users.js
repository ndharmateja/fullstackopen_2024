const getAllUsers = async (_req, res) => {
    return res.json({ route: "get all users" });
};

const createUser = async (_req, res) => {
    return res.json({ route: "create user" });
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

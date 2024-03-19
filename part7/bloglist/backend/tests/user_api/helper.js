const User = require("../../models/User");

const initialUsers = [
    {
        username: "username1",
        password: "password1",
        passwordHash: "hash1",
        name: "name1",
    },
    {
        username: "username2",
        password: "password2",
        passwordHash: "hash2",
        name: "name2",
    },
];

const usersInDb = async () => {
    const users = await User.find({});
    return users.map((user) => user.toJSON());
};

module.exports = { initialUsers, usersInDb };

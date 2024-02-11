require("dotenv").config();
const process = require("process");

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
    PORT,
    MONGODB_URI,
};

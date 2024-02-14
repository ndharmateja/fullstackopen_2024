require("dotenv").config();
const process = require("process");

const PROD_ENV = "prod";
const DEV_ENV = "dev";
const TEST_ENV = "test";

const isProd = () => process.env.NODE_ENV === PROD_ENV;
const isDev = () => process.env.NODE_ENV === DEV_ENV;
const isTest = () => process.env.NODE_ENV === TEST_ENV;

const PORT = process.env.PORT || 3001;
const MONGODB_URI = isTest()
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = {
    PORT,
    MONGODB_URI,
};

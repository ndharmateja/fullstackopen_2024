const jwt = require("jsonwebtoken");
const logger = require("./logger");
const BlogAppError = require("../errors/BlogAppError");
const config = require("./config");

const userExtractor = (req, _res, next) => {
    // Check if bearer token exists
    const authorization = req.get("authorization");
    if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
        throw new BlogAppError(401, "missing token");
    }

    // Verify token
    const token = authorization.substring(7);
    const { id: userId } = jwt.verify(token, config.SECRET);

    // Add id of caller to the req object
    req.userId = userId;

    next();
};

const notFoundRoute = (_req, res) =>
    res
        .status(404)
        .send('<h1>Unknown endpoint</h1><p>Go to <a href="/info">info</a></p>');

const requestLogger = (req, _res, next) => {
    logger.info("Method:", req.method);
    logger.info("Path:  ", req.path);
    logger.info("Body:  ", req.body);
    logger.info("---");
    next();
};

const isUsernameDuplicate = (error) =>
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error collection");

const errorHandler = (error, _req, res, next) => {
    logger.info(error);

    // Mongoose invalid id error
    if (error.name === "CastError")
        return res.status(400).json({ error: "malformed id" });

    // Mongoose validation error
    if (error.name === "ValidationError")
        return res.status(400).json({ error: error.message });

    // Json web token error
    if (error.name === "JsonWebTokenError")
        return res.status(401).json({ error: "invalid token" });

    // Duplicate username error
    if (isUsernameDuplicate(error))
        return res.status(400).json({ error: "username must be unique" });

    // Internal app error
    if (error instanceof BlogAppError)
        return res.status(error.status).json({ error: error.message });

    next(error);
};

module.exports = { userExtractor, notFoundRoute, requestLogger, errorHandler };

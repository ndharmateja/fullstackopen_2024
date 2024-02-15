const logger = require("./logger");
const BlogAppError = require("../errors/BlogAppError");

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
        return res.status(400).json({ error: "malformed `id`" });

    // Mongoose validation error
    if (error.name === "ValidationError")
        return res.status(400).json({ error: error.message });

    // Duplicate username error
    if (isUsernameDuplicate(error))
        return res.status(400).json({ error: "`username` should be unique" });

    // Internal app error
    if (error instanceof BlogAppError)
        return res.status(error.status).json({ error: error.message });

    next(error);
};

module.exports = { notFoundRoute, requestLogger, errorHandler };

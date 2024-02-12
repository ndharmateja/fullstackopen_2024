const logger = require("./logger");

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

const errorHandler = (error, _req, res, next) => {
    logger.info(error);

    if (error.name === "CastError") {
        return res.status(400).json({ error: "malformed id" });
    } else if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
    }

    next(error);
};

module.exports = { notFoundRoute, requestLogger, errorHandler };

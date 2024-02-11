const morgan = require("morgan");
const logger = require("./logger");

const notFoundRoute = (req, res) =>
    res
        .status(404)
        .send('<h1>Unknown endpoint</h1><p>Go to <a href="/info">info</a></p>');

const requestLogger = morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
        JSON.stringify(req.body),
    ].join(" ");
});

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

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./routes/blogs");
require("dotenv").config();
const logger = require("./utils/logger");
const mw = require("./utils/middleware");

// Connect to Mongo DB
const mongoUrl = process.env.MONGODB_URI;
logger.info("Connecting to Mongo DB..");
mongoose
    .connect(mongoUrl)
    .then(() => logger.info("Successfully connected to Mongo DB."))
    .catch((e) =>
        logger.error(`Failed to connect to Mongo DB. "${e.message}"`)
    );

// Middleware
app.use(cors());
app.use(express.json());
app.use(mw.requestLogger);
app.use(express.static("dist"));

// Routes
app.use("/api/blogs", blogsRouter);

// Not found route and error handler middleware
app.use(mw.notFoundRoute);
app.use(mw.errorHandler);

module.exports = app;

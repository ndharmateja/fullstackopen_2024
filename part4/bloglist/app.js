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

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;

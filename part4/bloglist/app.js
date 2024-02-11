const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/Blog");
const blogsRouter = require("./routes/blogs");
require("dotenv").config();

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;

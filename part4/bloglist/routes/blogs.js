const express = require("express");
const { getAllBlogs, createBlog } = require("../controllers/blogs");

const blogsRouter = express.Router();
blogsRouter.route("/").get(getAllBlogs).post(createBlog);

module.exports = blogsRouter;

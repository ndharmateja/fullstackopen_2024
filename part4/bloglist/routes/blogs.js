const express = require("express");
const { getAllBlogs, createBlog, deleteBlog } = require("../controllers/blogs");

const blogsRouter = express.Router();
blogsRouter.route("/").get(getAllBlogs).post(createBlog);
blogsRouter.route("/:id").delete(deleteBlog);

module.exports = blogsRouter;

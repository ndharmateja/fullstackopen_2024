const express = require("express");
const {
    getAllBlogs,
    createBlog,
    getOneBlog,
    deleteBlog,
    updateBlog,
} = require("../controllers/blogs");
const mw = require("../utils/middleware");

// Create blogs router
const blogsRouter = express.Router();

// Route /api/blogs
blogsRouter.route("/").get(getAllBlogs).post(mw.userExtractor, createBlog);

// Route /api/blogs/:id
blogsRouter.route("/:id").get(getOneBlog).put(updateBlog).delete(deleteBlog);

module.exports = blogsRouter;

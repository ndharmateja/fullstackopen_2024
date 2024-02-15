const express = require("express");
const {
    getAllBlogs,
    createBlog,
    getOneBlog,
    deleteBlog,
    updateBlog,
} = require("../controllers/blogs");

// Create blogs router
const blogsRouter = express.Router();

// Route /api/blogs
blogsRouter.route("/").get(getAllBlogs).post(createBlog);

// Route /api/blogs/:id
blogsRouter.route("/:id").get(getOneBlog).put(updateBlog).delete(deleteBlog);

module.exports = blogsRouter;

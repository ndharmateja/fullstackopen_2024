const express = require("express");
const {
    getAllBlogs,
    createBlog,
    getOneBlog,
    deleteBlog,
    updateBlog,
} = require("../controllers/blogs");
const mw = require("../utils/middleware");
const commentsRouter = require("./comments");

// Create blogs router
const blogsRouter = express.Router();

// Route /api/blogs
blogsRouter.route("/").get(getAllBlogs).post(mw.userExtractor, createBlog);

// Route /api/blogs/:id
blogsRouter
    .route("/:id")
    .get(getOneBlog)
    .put(updateBlog)
    .delete(mw.userExtractor, deleteBlog);

// Route for comments /api/blogs/:id/comments
blogsRouter.use("/:id/comments", commentsRouter);

module.exports = blogsRouter;

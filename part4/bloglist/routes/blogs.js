const express = require("express");
const {
    getAllBlogs,
    createBlog,
    getOneBlog,
    deleteBlog,
} = require("../controllers/blogs");

const blogsRouter = express.Router();
blogsRouter.route("/").get(getAllBlogs).post(createBlog);
blogsRouter.route("/:id").get(getOneBlog).delete(deleteBlog);

module.exports = blogsRouter;

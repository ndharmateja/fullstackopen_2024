const express = require("express");
const {
    getAllBlogs,
    createBlog,
    getOneBlog,
    deleteBlog,
    updateBlog,
} = require("../controllers/blogs");

const blogsRouter = express.Router();
blogsRouter.route("/").get(getAllBlogs).post(createBlog);
blogsRouter.route("/:id").get(getOneBlog).put(updateBlog).delete(deleteBlog);

module.exports = blogsRouter;

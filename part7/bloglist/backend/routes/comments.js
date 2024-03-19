const express = require("express");
const Comment = require("../models/Comment");
const Blog = require("../models/Blog");
const BlogAppError = require("../errors/BlogAppError");

const commentsRouter = express.Router({ mergeParams: true });

commentsRouter.route("/").post(async (req, res) => {
    const { id: blogId } = req.params;
    const { content } = req.body;

    // Find the corresponding blog
    const blog = await Blog.findById(blogId);
    if (!blog) throw new BlogAppError(404, "Invalid blog id");

    // new comment
    const comment = new Comment({
        content,
        blog: blogId,
    });
    const savedComment = await comment.save();

    // update comment id in blog
    if (blog.comments) blog.comments.push(savedComment.id);
    else blog.comments = [savedComment.id];
    await blog.save();

    // return comment
    return res.status(201).json(savedComment);
});

module.exports = commentsRouter;

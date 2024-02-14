const Blog = require("../models/Blog");

const getAllBlogs = async (_req, res) => {
    const blogs = await Blog.find({});
    return res.json(blogs);
};

const createBlog = async (req, res) => {
    const blog = new Blog(req.body);
    const result = await blog.save();
    return res.status(201).json(result);
};

module.exports = { getAllBlogs, createBlog };

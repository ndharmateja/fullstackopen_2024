const Blog = require("../models/Blog");

const getAllBlogs = async (_req, res) => {
    const blogs = await Blog.find({});
    return res.json(blogs);
};

const createBlog = async (req, res) => {
    const blogData = req.body;

    // likes should default to 0 if missing in req
    if (!blogData.likes) blogData.likes = 0;

    const blog = new Blog(blogData);
    const result = await blog.save();
    return res.status(201).json(result);
};

module.exports = { getAllBlogs, createBlog };

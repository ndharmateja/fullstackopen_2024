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

const deleteBlog = async (req, res) => {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    return res.status(204).end();
};

module.exports = { getAllBlogs, createBlog, deleteBlog };

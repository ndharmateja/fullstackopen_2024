const Blog = require("../models/Blog");

const getAllBlogs = (_req, res) => {
    Blog.find({}).then((blogs) => {
        res.json(blogs);
    });
};

const createBlog = (req, res) => {
    const blog = new Blog(req.body);

    blog.save().then((result) => {
        res.status(201).json(result);
    });
};

module.exports = { getAllBlogs, createBlog };

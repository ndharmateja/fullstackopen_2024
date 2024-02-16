const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");
const User = require("../models/User");
const config = require("../utils/config");
const BlogAppError = require("../errors/BlogAppError");

const getAllBlogs = async (_req, res) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
        id: 1,
    });
    return res.json(blogs);
};

const getTokenFrom = (req) => {
    const authorization = req.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "");
    }
    return null;
};

const createBlog = async (req, res) => {
    // Authorize req
    const token = getTokenFrom(req);
    if (!token) throw new BlogAppError(401, "invalid or missing token");

    // Get user id from token and get user
    const { id: userId } = jwt.verify(token, config.SECRET);
    const user = await User.findById(userId);

    // get blog data and likes should default to 0 if missing in req
    const blogData = req.body;
    if (!blogData.likes) blogData.likes = 0;

    // Add user to blog and create blog
    blogData.user = user.id;
    const blog = new Blog(blogData);
    const result = await blog.save();

    // Add blog id to user and save user
    user.blogs = user.blogs.concat(result.id);
    await user.save();

    return res.status(201).json(result);
};

const getOneBlog = async (req, res) => {
    const id = req.params.id;

    const blog = await Blog.findById(id);
    if (blog) return res.json(blog);
    else return res.status(404).end();
};

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const blog = {
        likes: body.likes,
        url: body.url,
        title: body.title,
        author: body.author,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
        new: true,
        runValidators: true,
    });
    return res.json(updatedBlog);
};

const deleteBlog = async (req, res) => {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    return res.status(204).end();
};

module.exports = {
    getAllBlogs,
    createBlog,
    getOneBlog,
    updateBlog,
    deleteBlog,
};

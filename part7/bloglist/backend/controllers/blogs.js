const BlogAppError = require("../errors/BlogAppError");
const Blog = require("../models/Blog");
const User = require("../models/User");

const getAllBlogs = async (_req, res) => {
    const blogs = await Blog.find({})
        .populate("user", {
            username: 1,
            name: 1,
            id: 1,
        })
        .populate("comments", { content: 1, createdAt: 1 });
    return res.json(blogs);
};

const createBlog = async (req, res) => {
    // Get user id from req
    const userId = req.userId;
    const user = await User.findById(userId);

    // get blog data and likes should default to 0 if missing in req
    const blogData = req.body;
    if (!blogData.likes) blogData.likes = 0;

    // Add user to blog and create blog
    blogData.user = user.id;
    const blog = new Blog(blogData);
    const createdBlog = await blog.save();

    // Add blog id to user and save user
    user.blogs = user.blogs.concat(createdBlog.id);
    await user.save();

    // retrieve blog and return
    const fetchedBlog = await Blog.findById(createdBlog.id)
        .populate("user", {
            username: 1,
            name: 1,
            id: 1,
        })
        .populate("comments", { content: 1, createdAt: 1 });

    return res.status(201).json(fetchedBlog);
};

const getOneBlog = async (req, res) => {
    const id = req.params.id;

    const blog = await Blog.findById(id)
        .populate("user", {
            username: 1,
            name: 1,
            id: 1,
        })
        .populate("comments", { content: 1, createdAt: 1 });
    if (blog) return res.json(blog);
    else return res.status(404).end();
};

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const blog = {
        user: body.user,
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
    // Get user id from req
    const callerId = req.userId;

    // Only users who created the blogs can delete them
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    // If no such blog exists, exit
    if (!blog) return res.status(204).end();

    // If the user id of the blog doesn't match the blog's user, error
    if (blog.user.toString() !== callerId)
        throw new BlogAppError(401, "unauthorized to delete");

    // Delete blog
    await Blog.findByIdAndDelete(blogId);

    // remove blog id from user doc
    const user = await User.findById(callerId);
    user.blogs = user.blogs.filter((b) => b !== blogId);
    await user.save();

    return res.status(204).end();
};

module.exports = {
    getAllBlogs,
    createBlog,
    getOneBlog,
    updateBlog,
    deleteBlog,
};

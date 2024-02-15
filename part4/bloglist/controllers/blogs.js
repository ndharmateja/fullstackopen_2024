const Blog = require("../models/Blog");
const User = require("../models/User");

const getAllBlogs = async (_req, res) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
        id: 1,
    });
    return res.json(blogs);
};

const createBlog = async (req, res) => {
    const blogData = req.body;

    // likes should default to 0 if missing in req
    if (!blogData.likes) blogData.likes = 0;

    // Get a random user from the DB
    const user = await User.findOne({});
    console.log("User", user);

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

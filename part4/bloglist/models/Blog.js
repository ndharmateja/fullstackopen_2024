const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});
blogSchema.set("toJSON", {
    transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
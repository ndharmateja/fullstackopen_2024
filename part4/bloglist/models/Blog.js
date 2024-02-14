const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: String,
    url: {
        type: String,
        required: true,
    },
    likes: Number,
});
blogSchema.set("toJSON", {
    transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

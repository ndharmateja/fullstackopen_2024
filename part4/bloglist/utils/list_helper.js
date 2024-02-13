const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
    blogs.reduce((likes, currentBlog) => likes + currentBlog.likes, 0);

module.exports = { dummy, totalLikes };

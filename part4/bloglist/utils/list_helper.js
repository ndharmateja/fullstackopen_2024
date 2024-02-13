const dummy = (_blogs) => 1;

const totalLikes = (blogs) =>
    blogs.reduce((likes, currentBlog) => likes + currentBlog.likes, 0);

const favoriteBlog = (blogs) =>
    blogs.reduce((favBlog, currBlog) => {
        // if fav blog is undefined (initial value) or
        // if the curr blog's likes are higher than fav blog's likes
        // we choose curr blog, otherwise we choose fav blog
        return !favBlog || currBlog.likes > favBlog.likes ? currBlog : favBlog;
    }, undefined);

module.exports = { dummy, totalLikes, favoriteBlog };

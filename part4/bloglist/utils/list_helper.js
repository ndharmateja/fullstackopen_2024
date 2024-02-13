const logger = require("./logger");

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

const mostBlogs = (blogs) => {
    const authorBlogCounts = blogs.reduce((counts, currBlog) => {
        const currAuthor = currBlog.author;
        return {
            ...counts,
            [currAuthor]: ([currAuthor] in counts ? counts[currAuthor] : 0) + 1,
        };
    }, {});

    return Object.entries(authorBlogCounts).reduce(
        (maxCount, currAuthorCount) => {
            // maxCount format: undefined or {"author": "author name", "blogs": 3}
            // currAuthorCount format: ["author name", 3]
            const [author, blogs] = currAuthorCount;
            if (!maxCount || blogs > maxCount.blogs) return { author, blogs };
            return maxCount;
        },
        undefined
    );
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };

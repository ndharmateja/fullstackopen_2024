import Blog from "./Blog";

const Blogs = ({ blogs, likeBlog, deleteBlog, loggedInUserName }) => {
    return (
        <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    likeBlog={likeBlog}
                    deleteBlog={deleteBlog}
                    loggedInUserName={loggedInUserName}
                />
            ))}
        </div>
    );
};

export default Blogs;

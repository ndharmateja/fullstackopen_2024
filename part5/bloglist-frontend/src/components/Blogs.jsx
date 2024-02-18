import Blog from "./Blog";

const Blogs = ({ blogs, name, onLogoutClick }) => {
    return (
        <div>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default Blogs;

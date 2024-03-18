import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogsList = () => {
    const blogs = useSelector((store) => store.blogs);

    return (
        <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default BlogsList;

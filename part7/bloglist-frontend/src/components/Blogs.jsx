import Blog from "./Blog";
import { useSelector } from "react-redux";

const Blogs = ({ loggedInUserName }) => {
    const blogs = useSelector((store) => store.blogs);

    return (
        <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    loggedInUserName={loggedInUserName}
                />
            ))}
        </div>
    );
};

export default Blogs;

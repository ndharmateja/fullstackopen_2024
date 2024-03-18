import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogsList = () => {
    const blogs = useSelector((store) => store.blogs);

    return blogs.map((blog) => <Blog key={blog.id} blog={blog} />);
};

export default BlogsList;

import { Link } from "react-router-dom";
import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogsList = () => {
    const blogs = useSelector((store) => store.blogs);

    const blogStyle = {
        paddingTop: 5,
        paddingLeft: 5,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
        paddingBottom: 5,
    };

    return blogs.map(({ id, title }) => (
        <div style={blogStyle} key={id}>
            <Link to={`/blogs/${id}`}>{title}</Link>
        </div>
    ));
};

export default BlogsList;

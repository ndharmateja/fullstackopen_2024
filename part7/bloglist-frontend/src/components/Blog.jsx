import { useState } from "react";
import { likeBlog } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";

const Blog = ({ blog, deleteBlog, loggedInUserName }) => {
    const { title, url, likes, author } = blog;
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();

    const toggleVisibility = () => setVisible(!visible);
    const handleRemoveClick = async () => {
        const shouldRemove = window.confirm(
            `Remove blog "${title}" by "${author}"?`
        );
        if (shouldRemove) await deleteBlog(blog.id);
    };

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    return (
        <div style={blogStyle}>
            <div>
                {title}{" "}
                <button onClick={toggleVisibility}>
                    {visible ? "hide" : "view"}
                </button>
            </div>
            {visible && (
                <div>
                    <div>{url}</div>
                    <div>
                        likes: {likes}{" "}
                        <button onClick={() => dispatch(likeBlog(blog.id))}>
                            like
                        </button>
                    </div>
                    <div>{author}</div>
                    {loggedInUserName === blog.user.username && (
                        <button onClick={handleRemoveClick}>remove</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Blog;

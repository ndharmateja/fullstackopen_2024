import { useState } from "react";

const Blog = ({ blog, likeBlog }) => {
    const { title, url, likes, author } = blog;
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => setVisible(!visible);
    const handleLikeClick = async () => {
        await likeBlog(blog);
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
                        <button onClick={handleLikeClick}>like</button>
                    </div>
                    <div>{author}</div>
                </div>
            )}
        </div>
    );
};

export default Blog;

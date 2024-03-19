import { deleteBlog, likeBlog } from "../../reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

const Blog = () => {
    const { id } = useParams();
    const blog = useSelector(({ blogs }) => blogs.find((b) => b.id === id));
    const loggedInUserName = useSelector((store) => store.user.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!blog) return null;

    const {
        title,
        url,
        likes,
        author,
        user: { name, username, id: userId },
        comments,
    } = blog;

    const handleRemoveClick = async () => {
        const shouldRemove = window.confirm(
            `Remove blog "${title}" by "${author}"?`
        );
        if (shouldRemove) {
            dispatch(deleteBlog(blog.id));
            navigate("/");
        }
    };

    return (
        <div>
            <h2>{title}</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Url:</td>
                        <td>
                            <a target="_blank" href={url}>
                                {url}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>Likes:</td>
                        <td>
                            {likes}&nbsp;
                            <button onClick={() => dispatch(likeBlog(blog.id))}>
                                like
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Author:</td>
                        <td>{author}</td>
                    </tr>
                    <tr>
                        <td>Created by:</td>
                        <td>
                            <Link to={`/users/${userId}`}>{name}</Link>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* remove button only if logged in user created the blog */}
            {loggedInUserName === username && (
                <>
                    <br />
                    <button onClick={handleRemoveClick}>remove</button>
                </>
            )}

            {/* comments */}
            <h3>Comments</h3>
            {comments.length === 0 ? (
                <div>No comments</div>
            ) : (
                <ul>
                    {comments.map(({ id, content }) => (
                        <li key={id}>{content}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Blog;

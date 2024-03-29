import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import { BLOG_APP_USER } from "./constants";
import Header from "./components/Header";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState({
        message: null,
        isError: false,
    });
    const togglableRef = useRef();

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const userString = window.localStorage.getItem(BLOG_APP_USER);
        if (userString) {
            const parsedUser = JSON.parse(userString);
            setUser(parsedUser);
            blogService.setToken(parsedUser.token);
        }
    }, []);

    const showNotification = (message, isError) => {
        setNotification({ message, isError });
        setTimeout(() => {
            clearNotification();
        }, 5000);
    };

    const clearNotification = () =>
        setNotification({ ...notification, message: null });

    const login = async (username, password) => {
        try {
            const fetchedUser = await blogService.login(username, password);

            // Store to local storage
            window.localStorage.setItem(
                BLOG_APP_USER,
                JSON.stringify(fetchedUser)
            );
            setUser(fetchedUser);
            blogService.setToken(fetchedUser.token);
        } catch (error) {
            showNotification(error.response.data.error, true);

            // throw error for the child component
            throw new Error("login failed");
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem(BLOG_APP_USER);
        blogService.setToken(null);
        setUser(null);
    };

    const createBlog = async (title, author, url) => {
        if (!title || !author || !url) return;

        try {
            const newBlog = await blogService.createBlog(title, author, url);
            // show notification and toggle form visibility and add blog to state
            showNotification(
                `a new blog "${title}" by "${author}" added`,
                false
            );
            togglableRef.current.toggleVisibility();
            setBlogs([...blogs, newBlog]);
        } catch (error) {
            showNotification(error.response.data.error, true);

            // throw error for the child component
            throw new Error("post creation failed");
        }
    };

    const likeBlog = async (blog) => {
        const blogId = blog.id;
        const blogCopy = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id,
        };
        delete blogCopy.id;

        const updatedBlog = await blogService.updateBlog(blogId, blogCopy);
        setBlogs(blogs.map((b) => (b.id === blogId ? updatedBlog : b)));
    };

    const deleteBlog = async (blogId) => {
        try {
            await blogService.deleteBlog(blogId);

            // show notification & remove the blog with blogId from state
            const blogToDelete = blogs.find((b) => b.id === blogId);
            const { title, author } = blogToDelete;
            showNotification(`blog "${title}" by "${author}" deleted`, false);
            setBlogs(blogs.filter((b) => b.id !== blogId));
        } catch (error) {
            console.log(error);
        }
    };

    // sort blogs in decreasing order of likes
    blogs.sort((b1, b2) => -(b1.likes - b2.likes));

    return (
        <div>
            <Notification
                message={notification.message}
                isError={notification.isError}
            />
            {user === null ? (
                <LoginForm login={login} />
            ) : (
                <div>
                    <Header name={user.name} onLogoutClick={handleLogout} />
                    <Togglable buttonLabel="new blog" ref={togglableRef}>
                        <CreateBlogForm createBlog={createBlog} />
                    </Togglable>
                    <Blogs
                        blogs={blogs}
                        likeBlog={likeBlog}
                        deleteBlog={deleteBlog}
                        loggedInUserName={user.username}
                    />
                </div>
            )}
        </div>
    );
};

export default App;

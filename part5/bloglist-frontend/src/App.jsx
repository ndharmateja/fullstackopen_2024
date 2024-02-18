import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import { BLOG_APP_USER } from "./constants";
import Header from "./components/Header";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState({
        message: null,
        isError: false,
    });

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
            showNotification(`a new blog "${title}" by "${author}" added`);
            setBlogs([...blogs, newBlog]);
        } catch (error) {
            showNotification(error.response.data.error, true);

            // throw error for the child component
            throw new Error("post creation failed");
        }
    };

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
                    <CreateBlogForm createBlog={createBlog} />
                    <Blogs blogs={blogs} />
                </div>
            )}
        </div>
    );
};

export default App;

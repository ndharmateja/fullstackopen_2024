import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import { BLOG_APP_USER } from "./constants";
import Header from "./components/Header";
import CreateBlogForm from "./components/CreateBlogForm";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

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

    const login = async (username, password) => {
        const fetchedUser = await blogService.login(username, password);

        // Store to local storage
        window.localStorage.setItem(BLOG_APP_USER, JSON.stringify(fetchedUser));
        setUser(fetchedUser);
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
            setBlogs([...blogs, newBlog]);
        } catch (error) {
            // set notification
        }
    };

    return (
        <div>
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

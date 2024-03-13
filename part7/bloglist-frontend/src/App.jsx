import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import { BLOG_APP_USER } from "./constants";
import Header from "./components/Header";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { showAndHideNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";

const App = () => {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const userString = window.localStorage.getItem(BLOG_APP_USER);
        if (userString) {
            const parsedUser = JSON.parse(userString);
            setUser(parsedUser);
            blogService.setToken(parsedUser.token);

            // get blogs from backend
            dispatch(initializeBlogs());
        }
    }, []);

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
            dispatch(showAndHideNotification(error.response.data.error, true));

            // throw error for the child component
            throw new Error("login failed");
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem(BLOG_APP_USER);
        blogService.setToken(null);
        setUser(null);
    };

    return (
        <div>
            <Notification />
            {user === null ? (
                <LoginForm login={login} />
            ) : (
                <div>
                    <Header name={user.name} onLogoutClick={handleLogout} />
                    <Togglable buttonLabel="new blog">
                        <CreateBlogForm />
                    </Togglable>
                    <Blogs loggedInUserName={user.username} />
                </div>
            )}
        </div>
    );
};

export default App;

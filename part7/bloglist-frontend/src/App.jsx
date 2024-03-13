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
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const togglableRef = useRef();
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

    const createBlog = async (title, author, url) => {
        if (!title || !author || !url) return;

        try {
            const newBlog = await blogService.createBlog(title, author, url);
            // show notification and toggle form visibility and add blog to state
            dispatch(
                showAndHideNotification(
                    `a new blog "${title}" by "${author}" added`
                )
            );
            togglableRef.current.toggleVisibility();
            setBlogs([...blogs, newBlog]);
        } catch (error) {
            dispatch(showAndHideNotification(error.response.data.error, true));

            // throw error for the child component
            throw new Error("post creation failed");
        }
    };

    // sort blogs in decreasing order of likes
    blogs.sort((b1, b2) => -(b1.likes - b2.likes));

    return (
        <div>
            <Notification />
            {user === null ? (
                <LoginForm login={login} />
            ) : (
                <div>
                    <Header name={user.name} onLogoutClick={handleLogout} />
                    <Togglable buttonLabel="new blog" ref={togglableRef}>
                        <CreateBlogForm createBlog={createBlog} />
                    </Togglable>
                    <Blogs loggedInUserName={user.username} />
                </div>
            )}
        </div>
    );
};

export default App;

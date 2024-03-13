import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import Header from "./components/Header";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { loadUser } from "./reducers/userReducer";

const App = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, []);

    useEffect(() => {
        if (!user) return;
        dispatch(initializeBlogs());
    }, [user]);

    return (
        <div>
            <Notification />
            {user === null ? (
                <LoginForm />
            ) : (
                <div>
                    <Header />
                    <Togglable buttonLabel="new blog">
                        <CreateBlogForm />
                    </Togglable>
                    <Blogs />
                </div>
            )}
        </div>
    );
};

export default App;

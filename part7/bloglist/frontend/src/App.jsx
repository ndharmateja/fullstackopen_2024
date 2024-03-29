import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/blogs/Blogs";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { loadUser } from "./reducers/userReducer";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import { initializeUsers } from "./reducers/usersReducer";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Blog from "./components/blogs/Blog";

const App = () => {
    const [userLoaded, setUserLoaded] = useState(false);
    const loggedUser = useSelector((store) => store.user);
    const dispatch = useDispatch();

    // effect hook to load user from local storage
    useEffect(() => {
        dispatch(loadUser());
        setUserLoaded(true);
    }, []);

    // load blogs from backend if user is not null
    // effect runs again when 'user' changes (login etc)
    useEffect(() => {
        if (!loggedUser) return;
        dispatch(initializeBlogs());
        dispatch(initializeUsers());
    }, [loggedUser]);

    return !userLoaded ? (
        <div>loading...</div>
    ) : (
        <Router>
            <Notification />
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route path="/" element={<Blogs />} />
                    <Route
                        path="/blogs"
                        element={<Navigate to="/" replace />}
                    />
                    <Route path="/blogs/:id" element={<Blog />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<User />} />
                </Route>
                <Route
                    path="/login"
                    element={
                        loggedUser ? <Navigate to="/" replace /> : <LoginForm />
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;

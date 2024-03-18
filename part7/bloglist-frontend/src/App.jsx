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
import AppLayout from "./components/AppLayout";
import { initializeUsers } from "./reducers/usersReducer";
import Users from "./components/Users";

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
                <Route
                    element={
                        loggedUser ? (
                            <AppLayout />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                >
                    <Route path="/" element={<Blogs />} />
                    <Route
                        path="/blogs"
                        element={<Navigate to="/" replace />}
                    />
                    <Route path="/users" element={<Users />} />
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

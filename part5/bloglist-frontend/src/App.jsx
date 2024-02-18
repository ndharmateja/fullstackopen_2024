import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    const login = async (username, password) => {
        const user = await blogService.login(username, password);
        setUser(user);
    };

    return (
        <div>
            {user === null ? (
                <LoginForm login={login} />
            ) : (
                <Blogs blogs={blogs} name={user.name} />
            )}
        </div>
    );
};

export default App;

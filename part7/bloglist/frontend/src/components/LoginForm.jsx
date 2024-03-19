import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(login(username, password));
            setUsername("");
            setPassword("");
        } catch (error) {}
    };

    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">username </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label htmlFor="password">password </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button>login</button>
            </form>
        </div>
    );
};

export default LoginForm;

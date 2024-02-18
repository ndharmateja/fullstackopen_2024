import { useState } from "react";

const LoginForm = ({ login }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        console.log(e);
        e.preventDefault();
        try {
            await login(username, password);
            setUsername("");
            setPassword("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label htmlFor="password">password</label>
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

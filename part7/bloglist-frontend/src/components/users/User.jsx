import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
    const { id } = useParams();
    const user = useSelector(({ users }) => users.find((u) => u.id === id));

    if (!user) return <h2>Not found</h2>;

    return (
        <>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map((b) => (
                    <li key={b.id}>{b.title}</li>
                ))}
            </ul>
        </>
    );
};

export default User;

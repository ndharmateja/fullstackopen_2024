import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
    const users = useSelector((store) => store.users);

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <td>
                            <strong>Name</strong>
                        </td>
                        <td>
                            <strong>Blogs created</strong>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {users.map(({ id, name, username, blogs }) => {
                        return (
                            <tr key={id}>
                                <td>
                                    <Link to={`/users/${id}`}>
                                        {name} - <em>@{username}</em>
                                    </Link>
                                </td>
                                <td>{blogs.length}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Users;

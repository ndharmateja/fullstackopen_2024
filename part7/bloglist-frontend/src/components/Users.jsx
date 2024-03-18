import React from "react";
import { useSelector } from "react-redux";

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
                    {users.map(({ id, name, blogs }) => {
                        return (
                            <tr key={id}>
                                <td>{name}</td>
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

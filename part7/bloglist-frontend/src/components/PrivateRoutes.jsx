import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "./Header";
import { useSelector } from "react-redux";

// Reference: https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
const PrivateRoutes = () => {
    const loggedUser = useSelector(({ user }) => user);

    return loggedUser ? (
        <div>
            <Header />
            <br />
            <Outlet />
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoutes;

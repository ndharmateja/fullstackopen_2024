import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout = () => {
    return (
        <div>
            <Header />
            <br />
            <Outlet />
        </div>
    );
};

export default AppLayout;

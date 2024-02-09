import React from "react";
import { Outlet } from "react-router-dom"
import "./layout.css";

const Layout = () => {
    return(
        <Outlet />
    )
}

export default Layout;
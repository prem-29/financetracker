import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "../components/Home";
import Dashboard from "../components/Pages/Dashboard";
import Login from "../components/Login";
import { selectIsAuthenticate } from "../slices/user_slice";
import { useSelector } from "react-redux";
const NavBar = () => {
    const isAuthenticated = useSelector(selectIsAuthenticate);
    return (
        <Routes>
            {/* {!isAuthenticated ? <Route path="/" element={<Login />} /> :
                <Route path="/home" element={<Home />} />} */}
            <Route path="/" element={<Login />} />
            <Route
                path="/dashboard"
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
                path="*"
                element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />}
            />
        </Routes>
    )
}
export default NavBar;
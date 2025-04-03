import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../user/container/auth/Register";
import Login from "../user/container/auth/Loging";
import HomePage from "../user/container/page/Home";
import Adminlogin from "../Admin/pages/Adminlogin";
import AdminDashboard from "../Admin/pages/AdminDashboard";
import Profile from "../Admin/pages/Profile";
import Header from "../Admin/pages/Header";
import Properties from "../Admin/components/Properties"
import About from "../Admin/pages/About";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
        {/* User Routes End */}

        {/* Admin Routes */}
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/header" element={<Header />} />
        <Route path="/properties" element={<Properties />}/>
        <Route path="/about" element={<About />}/>
        {/* Admin Routes End */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

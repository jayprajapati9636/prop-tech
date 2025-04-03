import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../user/container/auth/Register";
import Login from "../user/container/auth/Loging";
import HomePage from "../user/container/page/Home";
import Adminlogin from "../Admin/pages/Adminlogin";
import AdminDashboard from "../Admin/pages/AdminDashboard"
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<HomePage />}/>
        <Route path="/adminlogin" element={<Adminlogin />}/>
        <Route path="/admidashboard" element={<AdminDashboard />}/>
         
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

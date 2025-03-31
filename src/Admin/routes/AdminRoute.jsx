import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import AdminLogin from "../pages/Adminlogin";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/adminlogin" />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AdminRoutes;

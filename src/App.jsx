import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./Admin/pages/AdminDashboard";
import Adminlogin from "./Admin/pages/Adminlogin";

function App() {
  return (
    <Routes>
      <Route path="/adminlogin" element={<Adminlogin />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;

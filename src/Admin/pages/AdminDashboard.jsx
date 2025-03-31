import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import DashboardHome from "./pages/DashboardHome";
// import Properties from "./pages/Properties";
// import Tenants from "./pages/Tenants";
// import Payments from "./pages/Payments";
// import Maintenance from "./pages/Maintenance";

const AdminDashboard = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">  b  k n
        <Sidebar />
        <div className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/maintenance" element={<Maintenance />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AdminDashboard;
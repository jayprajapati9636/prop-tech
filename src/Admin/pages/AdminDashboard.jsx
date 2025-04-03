import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "../components/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const closeHeader = () => {
    setIsHeaderOpen(false);
  };

  // Chart data
  const data = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 2000 },
    { name: "Apr", revenue: 2780 },
    { name: "May", revenue: 1890 },
    { name: "Jun", revenue: 2390 },
    { name: "Jul", revenue: 3490 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header with Sidebar Toggle */}
      <Header toggleSidebar={toggleSidebar} isHeaderOpen={isHeaderOpen} closeHeader={closeHeader} />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      {/* Main Content (Full Width) */}
      <div className={`p-6 mt-16 ${isSidebarOpen ? "ml-72" : "ml-0"} transition-all duration-300`}>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-3 gap-6 mt-5">
          <div className="bg-white p-6 rounded-lg shadow">Revenue: $23k</div>
          <div className="bg-white p-6 rounded-lg shadow">Sell: $2563</div>
          <div className="bg-white p-6 rounded-lg shadow">Rent: $2763</div>
        </div>

        {/* Statistics Graphs */}
        <div className="bg-white p-6 rounded-lg shadow mt-5 h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-5">
          <div className="bg-white p-6 rounded-lg shadow">Reports Summary</div>
          <div className="bg-white p-6 rounded-lg shadow">
            Customer Reviews & Activities
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

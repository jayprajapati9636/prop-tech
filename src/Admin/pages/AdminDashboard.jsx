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
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        {/* Header */}
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="p-6 pt-24">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Admin Dashboard
          </h1>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Revenue", value: "$23k", bg: "from-blue-500 to-indigo-500" },
              { title: "Sales", value: "$2563", bg: "from-green-400 to-emerald-500" },
              { title: "Rent", value: "$2763", bg: "from-purple-500 to-pink-500" },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-gradient-to-r ${item.bg} text-white p-6 rounded-2xl shadow-xl`}
              >
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-3xl mt-2">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Revenue Chart */}
          <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Revenue Overview
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Additional Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Reports Summary
              </h3>
              <p className="text-gray-500">
                Overview of recent report insights and metrics.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Customer Activity
              </h3>
              <p className="text-gray-500">
                Latest feedback and usage trends from users.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

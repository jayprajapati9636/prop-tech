import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [properties, setProperties] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerCount, setCustomerCount] = useState(0);
  const [propertyCount, setPropertyCount] = useState(0);

  const navigate = useNavigate();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return navigate("/admin/login");

      // Fetch Properties and Customers
      const propertyResponse = await axios.get("http://localhost:5001/api/admin/get-all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const customerResponse = await axios.get("http://localhost:5001/api/admin/customers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProperties(propertyResponse.data);
      setCustomers(customerResponse.data.customers);
      setPropertyCount(propertyResponse.data.length);
      setCustomerCount(customerResponse.data.customers.length); // Set customer count
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      } else {
        setError(err.response?.data?.message || "Failed to fetch data");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-72" : "ml-20"}`}
      >
        {/* Header */}
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="p-6 pt-24">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[ 
              { title: "Properties Available", value: propertyCount, bg: "from-blue-500 to-indigo-500" },
              { title: "Active Customers", value: customerCount, bg: "from-green-400 to-emerald-500" },
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

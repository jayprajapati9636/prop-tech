import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaHome, 
  FaBuilding, 
  FaUsers, 
  FaChartPie, 
  FaCog, 
  FaFileAlt, 
  FaKey, 
  FaSignOutAlt 
} from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function AdminDashboard() {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef(null);

  // chart data
  const data = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 2000 },
    { name: "Apr", revenue: 2780 },
    { name: "May", revenue: 1890 },
    { name: "Jun", revenue: 2390 },
    { name: "Jul", revenue: 3490 },
  ];
  useEffect(() => {
 
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle Logout
  const handleLogout = () => {
    navigate("/adminlogin");
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5 flex flex-col justify-between fixed left-0 top-0 h-full">
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-5">Tec.G</h2>
          <ul>
            <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/admindashboard")}>
              <FaHome /> <span>Dashboard</span>
            </li>
            <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/properties")}>
              <FaBuilding /> <span>Properties</span>
            </li>
            <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/customers")}>
              <FaUsers /> <span>Customers</span>
            </li>
            <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/reports")}>
              <FaChartPie /> <span>Reports</span>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li 
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer" 
              onClick={() => setShowSettings(!showSettings)}
            >
              <FaCog /> <span>Settings</span>
            </li>
            <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/documents")}>
              <FaFileAlt /> <span>Documents</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Settings Sidebar */}
      {showSettings && (
        <div ref={settingsRef} className="w-64 bg-white shadow-lg p-5 fixed right-0 top-0 h-full">
          <h2 className="text-xl font-bold text-blue-600 mb-5">Settings</h2>
          <ul>
            {/* Forgot Password Button */}
            <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/forgotpassword")}>
              <FaKey /> <span>Forgot Password</span>
            </li>
            {/* Logout Button */}
            <li 
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-red-200 cursor-pointer text-red-600"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> <span>Logout</span>
            </li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {/* Overview Statistics */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div className="bg-white p-5 rounded-lg shadow">Revenue: $23k</div>
          <div className="bg-white p-5 rounded-lg shadow">Sell: $2563</div>
          <div className="bg-white p-5 rounded-lg shadow">Rent: $2763</div>
        </div>

        {/* Statistics Graphs */}
        <div className="bg-white p-5 rounded-lg shadow mt-5 h-60">
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

       
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div className="bg-white p-5 rounded-lg shadow">Reports Summary</div>
          <div className="bg-white p-5 rounded-lg shadow">Customer Reviews & Activities</div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

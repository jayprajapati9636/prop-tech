import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../pages/Header";
import Sidebar from "../components/Sidebar";

const PropertyPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const adminDetails = useSelector((state) => state.auth.admin);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await axios.get("http://192.168.1.30:5001/api/admin/get-all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProperties(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminEmail");
          navigate("/adminlogin");
        } else {
          setError(err.response?.data?.message || "Failed to fetch properties");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-72" : "ml-20"}`}>
        {/* Header */}
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="p-6 pt-24">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Properties</h1>

          {loading ? (
            <p className="text-center mt-10">Loading properties...</p>
          ) : error ? (
            <p className="text-center text-red-500 mt-10">Error: {error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property.id || property._id} className="bg-white border rounded-xl shadow p-4 hover:shadow-lg transition">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                  <h2 className="text-xl font-semibold text-gray-800">{property.name}</h2>
                  <p className="text-gray-600">{property.location}</p>
                  <p className="text-green-600 font-bold mt-2">${property.price}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PropertyPage;

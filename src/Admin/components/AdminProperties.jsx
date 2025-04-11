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
  const [selectedProperty, setSelectedProperty] = useState(null);

  const navigate = useNavigate();
  const adminDetails = useSelector((state) => state.auth.admin);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://192.168.1.30:5001/api/admin/get-all", {
        headers: { Authorization: `Bearer ${token}` },
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

  useEffect(() => {
    fetchProperties();
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this property?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://192.168.1.30:5001/api/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties((prev) => prev.filter((property) => property._id !== id));
    } catch (error) {
      alert("Failed to delete property");
    }
  };

  const handleUpdate = (property) => {
    alert(`Update property: ${property.name}`);
    // You can navigate to update form or open update modal here
  };

  const ImageURL = "http://192.168.1.30:5001/uploads";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-72" : "ml-20"}`}>
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="p-6 pt-24">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Properties</h1>

          {loading ? (
            <p className="text-center mt-10">Loading properties...</p>
          ) : error ? (
            <p className="text-center text-red-500 mt-10">Error: {error}</p>
          ) : (
            <div className="overflow-x-auto bg-white shadow rounded-xl">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Property Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Address</th>
                    <th className="px-16 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {properties.map((property) => (
                    <tr key={property._id || property.id}>
                      <td className="px-6 py-4 text-gray-800 font-medium">{property.name}</td>
                      <td className="px-6 py-4 text-gray-600">{property.address || "N/A"}</td>
                      <td className="px-6 py-4 space-x-2" align="right">
                        <button
                          onClick={() => setSelectedProperty(property)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(property._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal Popup with Image and Address */}
          {selectedProperty && (
            <div
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
              onClick={() => setSelectedProperty(null)}
            >
              <div
                className="bg-white p-4 rounded-lg shadow-xl max-w-md w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                >
                  &times;
                </button>
                <img
                  src={`${ImageURL}/${selectedProperty.image}`}
                  alt="Property"
                  className="w-full h-auto rounded-md mb-4"
                />
                <p className="text-gray-700 font-medium text-center">
                  📍 {selectedProperty.location || selectedProperty.address || "No address available"}
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PropertyPage;

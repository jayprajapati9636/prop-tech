import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../pages/Header";
import Sidebar from "../components/Sidebar";

const PropertyPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [formMessage, setFormMessage] = useState("");

  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return navigate("/adminlogin");

      const response = await axios.get("http://localhost:5001/api/admin/get-all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
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

  const togglePropertyStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `http://localhost:5001/api/admin/property/status/${id}`,
        { isActive: !currentStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProperties((prev) =>
        prev.map((property) =>
          property._id === id ? { ...property, isActive: !currentStatus } : property
        )
      );
    } catch (err) {
      alert("Failed to update property status");
    }
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    if (!newName || !newAddress || !newImage) {
      return setFormMessage("Please fill all fields and select an image.");
    }

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setFormMessage("You must be logged in to add a property.");
        return navigate("/adminlogin");
      }

      const formData = new FormData();
      formData.append("name", newName);
      formData.append("address", newAddress);
      formData.append("image", newImage);

      const response = await fetch("http://localhost:5001/api/property/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add property");
      }

      setFormMessage("Property added successfully!");
      setShowForm(false);
      setNewName("");
      setNewAddress("");
      setNewImage(null);
      fetchProperties();
    } catch (err) {
      console.error(err);
      setFormMessage(err.message || "Failed to add property.");
    }
  };

  const ImageURL = "http://localhost:5001/uploads";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-72" : "ml-20"}`}>
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="p-6 pt-24">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Available Properties</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {showForm ? "Cancel" : "Add Property"}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleAddProperty} className="bg-white p-4 mb-6 rounded-lg shadow space-y-4 max-w-xl">
              <div>
                <label className="block font-medium text-gray-700">Property Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full"
                  onChange={(e) => setNewImage(e.target.files[0])}
                  required
                />
              </div>

              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Submit Property
              </button>

              {formMessage && <p className="text-sm text-center text-red-500">{formMessage}</p>}
            </form>
          )}

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
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {properties.map((property) => (
                    <tr key={property._id}>
                      <td className="px-6 py-4 text-gray-800 font-medium">{property.name}</td>
                      <td className="px-6 py-4 text-gray-600">{property.address || "N/A"}</td>
                      <td className="px-6 py-4">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={property.isActive}
                            onChange={() => togglePropertyStatus(property._id, property.isActive)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-600 relative">
                            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5" />
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            {property.isActive ? "Active" : "Inactive"}
                          </span>
                        </label>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedProperty(property)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

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
                  📍 {selectedProperty.address || "No address available"}
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

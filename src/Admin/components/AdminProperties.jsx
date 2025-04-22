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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  const ImageURL = "http://localhost:5001/uploads";
  const navigate = useNavigate();
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const [newProperty, setNewProperty] = useState({
    name: "",
    address: "",
    image: null,
    price: "",
  });

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return navigate("/admin/login");

      const response = await axios.get("http://localhost:5001/api/property/get-all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
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

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 on search
  }, [searchQuery]);

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
    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();
      formData.append("name", newProperty.name);
      formData.append("address", newProperty.address);
      formData.append("price", newProperty.price);
      formData.append("image", newProperty.image);

      await axios.post("http://localhost:5001/api/admin/addproperty", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setIsAddModalOpen(false);
      setNewProperty({ name: "", address: "", price: "", image: null });
      fetchProperties();
    } catch (err) {
      alert("Failed to add property");
    }
  };

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProperties.length / pageSize);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-72" : "ml-20"}`}>
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="p-6 pt-24">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Available Properties</h1>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border px-4 py-2 rounded"
              />
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                + Add Property
              </button>
            </div>
          </div>

          {loading ? (
            <p className="text-center mt-10">Loading properties...</p>
          ) : error ? (
            <p className="text-center text-red-500 mt-10">Error: {error}</p>
          ) : (
            <>
              <div className="overflow-x-auto bg-white shadow rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-600">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium  text-gray-50">Property Name</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-50">Address</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-50">Price</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-50">Status</th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-50">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedProperties.map((property) => (
                      <tr key={property._id}>
                        <td className="px-6 py-4 text-gray-800 font-medium">{property.name}</td>
                        <td className="px-6 py-4 text-gray-600">{property.address || "N/A"}</td>
                        <td className="px-6 py-4 text-gray-600">₹ {property.price || "Price Not Available"}</td>
                        <td className="px-6 py-4">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={property.isActive}
                              onChange={() => togglePropertyStatus(property._id, property.isActive)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:ring-blue-500 rounded-full peer-checked:bg-green-600 relative">
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 space-x-2">
                
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                
                </div>
              )}
            </>
          )}

          {/* View Modal */}
          {selectedProperty && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedProperty(null)}>
              <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
                >
                  &times;
                </button>
                <div className="flex flex-col items-center gap-4">
                  <h2 className="text-2xl font-semibold text-gray-800">{selectedProperty.name}</h2>
                  <img
                    src={`${ImageURL}/${selectedProperty.image}`}
                    alt="Property"
                    className="w-full h-60 object-cover rounded-lg shadow"
                  />
                  <div className="w-full space-y-2">
                    <p className="text-lg font-semibold text-gray-800">
                      <span className="text-gray-600 font-medium">Address:</span> {selectedProperty.address || "Not available"}
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      <span className="text-gray-600 font-medium">Price:</span> ₹ {selectedProperty.price || "Price Not Available"}
                    </p>
                    <p className="text-sm text-gray-500 mt-2 italic">
                      Status:{" "}
                      <span className={`font-semibold ${selectedProperty.isActive ? "text-green-600" : "text-red-500"}`}>
                        {selectedProperty.isActive ? "Active" : "Inactive"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Modal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setIsAddModalOpen(false)}>
              <form
                onSubmit={handleAddProperty}
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full space-y-4"
              >
                <h2 className="text-xl font-bold text-center text-gray-800">Add New Property</h2>
                <input
                  type="text"
                  placeholder="Property Name"
                  value={newProperty.name}
                  onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
                  required
                  className="w-full border px-4 py-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={newProperty.address}
                  onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
                  required
                  className="w-full border px-4 py-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={newProperty.price}
                  onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
                  required
                  className="w-full border px-4 py-2 rounded"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewProperty({ ...newProperty, image: e.target.files[0] })}
                  required
                  className="w-full"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Add
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PropertyPage;

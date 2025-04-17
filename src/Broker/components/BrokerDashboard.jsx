import React, { useEffect, useState } from "react";
import axios from "axios";
import BrokerNavbar from "../components/BrokerNavbar";
import BrokerSidebar from "../components/BrokerSidebar";
import { AiOutlineSearch } from "react-icons/ai";

const BrokerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [propertyList, setPropertyList] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatePropertyDetails, setUpdatePropertyDetails] = useState({
    propertyId: "",
    name: "",
    address: "",
    price: "",
  });

  const ImageURL = "http://localhost:5001/uploads";
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleUpdateModal = () => setIsModalOpen((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatePropertyDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    const { propertyId, name, price, address } = updatePropertyDetails;

    try {
      const token = localStorage.getItem("brokerToken");
      if (!token) throw new Error("Token missing");

      const response = await axios.put(
        `http://localhost:5001/api/broker/properties/${propertyId}`,
        { name, price, address },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        const updatedList = propertyList.map((property) =>
          property._id === propertyId
            ? { ...property, name, price, address }
            : property
        );
        setPropertyList(updatedList);
        setFilteredProperties(updatedList);
        alert("✅ Property updated!");
        toggleUpdateModal(); // Close modal after update
      }
    } catch (error) {
      alert("❌ Failed to update property.");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("brokerToken");
        if (!token) {
          setErrorMsg("Broker token not found.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5001/api/broker/properties", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
          setPropertyList(response.data);
          setFilteredProperties(response.data);
        } else {
          setErrorMsg("No properties found.");
        }
      } catch (error) {
        setErrorMsg(error.response?.data?.message || "Failed to fetch properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const deleteProperty = async (propertyId) => {
    try {
      const token = localStorage.getItem("brokerToken");
      if (!token) throw new Error("Token missing");

      const response = await axios.delete(`http://localhost:5001/api/broker/properties/${propertyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const updatedList = propertyList.filter((property) => property._id !== propertyId);
        setPropertyList(updatedList);
        setFilteredProperties(updatedList);
        alert("✅ Property deleted!");
      }
    } catch (error) {
      alert("❌ Failed to delete property.");
      console.error(error);
    }
  };

  const updateProperty = (property) => {
    setUpdatePropertyDetails({
      propertyId: property._id,
      name: property.name,
      address: property.address,
      price: property.price,
    });
    toggleUpdateModal(); // Open the update modal
  };

  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const paginate = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = propertyList.filter((property) =>
      property.name.toLowerCase().includes(term)
    );
    setFilteredProperties(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100 overflow-hidden">
      <BrokerNavbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`transition-all duration-300 bg-white shadow-md h-full ${
            isSidebarOpen ? "w-72" : "w-20"
          }`}
        >
          <BrokerSidebar isOpen={isSidebarOpen} />
        </div>

        <div className="flex-1 overflow-auto p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">All Properties</h2>

          {/* Search */}
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 border border-gray-300 rounded-md w-full max-w-md"
              placeholder="Search by property name"
            />
            <AiOutlineSearch className="ml-2 text-xl text-gray-500" />
          </div>

          {/* Add Button */}
          <button
            onClick={() => {}}
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 mb-4"
          >
            Add New Property
          </button>

          {/* Table */}
          {!isModalOpen && (
            <>
              {loading ? (
                <div className="text-gray-500 text-xl">Loading...</div>
              ) : errorMsg ? (
                <div className="text-red-500 text-xl">{errorMsg}</div>
              ) : (
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full table-auto border border-gray-300 bg-white rounded-lg shadow">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold border-b">Image</th>
                        <th className="px-6 py-3 text-left font-semibold border-b">Name</th>
                        <th className="px-6 py-3 text-left font-semibold border-b">Address</th>
                        <th className="px-6 py-3 text-left font-semibold border-b">Price</th>
                        <th className="px-6 py-3 text-center font-semibold border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProperties.map((property) => (
                        <tr key={property._id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 border-b">
                            <img
                              src={
                                property.image
                                  ? `${ImageURL}/${property.image}`
                                  : "/placeholder.jpg"
                              }
                              alt={property.name}
                              className="w-24 h-16 object-cover rounded"
                            />
                          </td>
                          <td className="px-6 py-4 border-b">{property.name}</td>
                          <td className="px-6 py-4 border-b">{property.address}</td>
                          <td className="px-6 py-4 border-b text-gray-800 font-medium">
                            ₹{property.price}
                          </td>
                          <td className="px-6 py-4 border-b text-center space-x-2">
                            <button
                              onClick={() => updateProperty(property)}
                              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => deleteProperty(property._id)}
                              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
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

              {/* Pagination */}
              <div className="mt-6 flex justify-center items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === index + 1
                        ? "bg-blue-700 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
            <h2 className="text-xl font-semibold mb-4">Update Property</h2>
            <form onSubmit={handleSubmitUpdate}>
              <div className="mb-4">
                <label className="block font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={updatePropertyDetails.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Address</label>
                <input
                  type="text"
                  name="address"
                  value={updatePropertyDetails.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  value={updatePropertyDetails.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  Update Property
                </button>
              </div>
            </form>
            <button
              onClick={toggleUpdateModal}
              className="absolute top-2 right-2 text-gray-500 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrokerDashboard;

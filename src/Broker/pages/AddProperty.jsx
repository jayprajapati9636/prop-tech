import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BrokerNavbar from "../components/BrokerNavbar";
import BrokerSidebar from "../components/BrokerSidebar";

const AddProperty = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [propertyData, setPropertyData] = useState({
    name: "",
    address: "",
    image: null,
  });

  const navigate = useNavigate();

  // 🔐 Redirect to login if token not found
  useEffect(() => {
    const token = localStorage.getItem("brokerToken");
    if (!token) {
      alert("Please login to continue.");
      navigate("/brokerlogin"); // make sure this matches your route
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setPropertyData({ ...propertyData, image: files[0] });
    } else {
      setPropertyData({ ...propertyData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("brokerToken"); // ✅ fixed token key
      console.log("Token from localStorage:", token);

      if (!token) {
        throw new Error("No token found");
      }

      const formData = new FormData();
      formData.append("name", propertyData.name);
      formData.append("address", propertyData.address);
      formData.append("image", propertyData.image);

      const response = await fetch("http://localhost:5001/api/property/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add property");
      }

      alert("Property added successfully!");

      setPropertyData({
        name: "",
        address: "",
        image: null,
      });

    } catch (error) {
      console.error("Error submitting property:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <div className="w-full">
        <BrokerNavbar toggleSidebar={toggleSidebar} />
      </div>

      {/* Content Below Navbar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`transition-all duration-300 bg-white shadow-md h-full ${isSidebarOpen ? "w-72" : "w-20"}`}>
          <BrokerSidebar isOpen={isSidebarOpen} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-50 p-6">
          <h2 className="text-2xl font-bold mb-6">Add New Property</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow max-w-xl">
            <input
              type="text"
              name="name"
              placeholder="Property Name"
              value={propertyData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={propertyData.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full"
              accept="image/*"
              required
            />
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;

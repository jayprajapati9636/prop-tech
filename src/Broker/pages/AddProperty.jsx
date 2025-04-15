import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BrokerNavbar from "../components/BrokerNavbar";
import BrokerSidebar from "../components/BrokerSidebar";

const AddProperty = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [propertyData, setPropertyData] = useState({
    name: "",
    address: "",
    image: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("brokerToken");
    if (!token) {
      alert("Please login to continue.");
      navigate("/brokerlogin");
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setPropertyData({ ...propertyData, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setPropertyData({ ...propertyData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("brokerToken");
      if (!token) throw new Error("Authentication token missing.");

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

      if (!response.ok) throw new Error(result.message || "Failed to add property");

      alert("✅ Property added successfully!");
      setPropertyData({ name: "", address: "", image: null });
      setImagePreview(null); // Clear preview

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <div className="w-full">
        <BrokerNavbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className={`transition-all duration-300 bg-white shadow-md h-full ${isSidebarOpen ? "w-72" : "w-20"}`}>
          <BrokerSidebar isOpen={isSidebarOpen} />
        </div>

        <div className="flex-1 overflow-auto bg-gray-100 p-6">
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
              className="w-full border px-3 py-2 rounded"
              accept="image/*"
              required
            />

            {imagePreview && (
              <div className="mt-4">
                <p className="mb-1 text-gray-700 font-medium">Image Preview:</p>
                <img src={imagePreview} alt="Preview" className="w-48 h-32 object-cover rounded border" />
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className={`bg-blue-600 text-white px-6 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;

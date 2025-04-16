import React, { useEffect, useState } from "react";
import axios from "axios";
import BrokerNavbar from "../components/BrokerNavbar";
import BrokerSidebar from "../components/BrokerSidebar";

const BrokerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [propertyList, setPropertyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("brokerToken");

        if (!token) {
          setErrorMsg("Broker token not found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5001/api/broker/properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setPropertyList(response.data);
        } else {
          setErrorMsg("No properties found.");
        }
      } catch (error) {
        console.error("❌ Error fetching properties:", error);
        setErrorMsg(error.response?.data?.message || "Failed to fetch properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Delete property function
  const deleteProperty = async (propertyId) => {
    try {
      const token = localStorage.getItem("brokerToken");

      if (!token) {
        throw new Error("Authentication token missing.");
      }

      console.log("Sending delete request for property ID:", propertyId); // Log the ID being sent

      const response = await axios.delete(
        `http://localhost:5001/api/broker/property/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setPropertyList((prevList) =>
          prevList.filter((property) => property._id !== propertyId)
        );
        alert("✅ Property deleted successfully!");
      }
    } catch (error) {
      console.error("❌ Error deleting property:", error.response?.data || error.message);
      alert("❌ Failed to delete property.");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-100">
      <div className="w-full">
        <BrokerNavbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div
          className={`transition-all duration-300 bg-white shadow-md h-full ${isSidebarOpen ? "w-72" : "w-20"}`}
        >
          <BrokerSidebar isOpen={isSidebarOpen} />
        </div>

        <div className="flex-1 overflow-auto p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">All Properties</h2>

          {loading ? (
            <div className="text-gray-500 text-xl">Loading properties...</div>
          ) : errorMsg ? (
            <div className="text-red-500 text-xl">{errorMsg}</div>
          ) : propertyList.length === 0 ? (
            <div className="text-gray-500 text-xl">No properties found.</div>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow-lg bg-white border border-gray-300">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-800 text-white text-xs uppercase tracking-wider rounded-t-lg">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-center">#</th>
                    <th className="px-6 py-4 font-semibold">Property Name</th>
                    <th className="px-6 py-4 font-semibold">Address</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Image</th>
                    <th className="px-6 py-4 font-semibold">Actions</th> {/* New column for delete */}
                  </tr>
                </thead>
                <tbody>
                  {propertyList.map((property, index) => (
                    <tr
                      key={property._id}
                      className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200 ease-in-out"
                    >
                      <td className="px-6 py-4 text-center">{index + 1}</td>
                      <td className="px-6 py-4">{property.name}</td>
                      <td className="px-6 py-4">{property.address}</td>
                      <td className="px-6 py-4 text-green-700 font-semibold">
                        ₹ {property.price ? property.price.toLocaleString() : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {property.image ? (
                          <img
                            src={`http://localhost:5001/uploads/${property.image}`}
                            alt={property.name}
                            className="h-24 w-32 object-cover rounded-md shadow-md"
                          />
                        ) : (
                          <div className="h-24 w-32 bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">
                            No Image
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => deleteProperty(property._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200"
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
        </div>
      </div>
    </div>
  );
};

export default BrokerDashboard;

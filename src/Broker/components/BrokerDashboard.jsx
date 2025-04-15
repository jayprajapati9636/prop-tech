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

        console.log("👉 Full API response:", response.data);

        if (response.data?.properties) {
          setPropertyList(response.data.properties);
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

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <div className="w-full">
        <BrokerNavbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div
          className={`transition-all duration-300 bg-white shadow-md h-full ${
            isSidebarOpen ? "w-72" : "w-20"
          }`}
        >
          <BrokerSidebar isOpen={isSidebarOpen} />
        </div>

        <div className="flex-1 overflow-auto bg-gray-50 p-4">
          <h2 className="text-2xl font-bold mb-4">All Properties</h2>

          {loading ? (
            <p className="text-gray-500">Loading properties...</p>
          ) : errorMsg ? (
            <p className="text-red-500">{errorMsg}</p>
          ) : propertyList.length === 0 ? (
            <p className="text-gray-500">No properties found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {propertyList.map((property) => (
                <div
                  key={property._id}
                  className="bg-white p-4 shadow rounded border border-gray-200"
                >
                  <h3 className="font-semibold text-lg mb-1">{property.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{property.address}</p>

                  {property.image ? (
                    <img
                      src={`http://localhost:5001/uploads/${property.image}`}
                      alt={property.name}
                      className="h-40 w-full object-cover rounded"
                    />
                  ) : (
                    <div className="h-40 w-full bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded">
                      No Image
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrokerDashboard;

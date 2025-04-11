import React, { useEffect, useState } from "react";
import BrokerNavbar from "../components/BrokerNavbar";
import BrokerSidebar from "../components/BrokerSidebar";
import axios from "axios";

const BrokerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [propertyList, setPropertyList] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // Use 'adminToken' if accessing /api/admin/get-all

        const response = await axios.get("http://192.168.1.30:5001/api/admin/get-all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPropertyList(response.data?.properties || []);
      } catch (error) {
        console.error("Error fetching properties:", error?.response?.data?.message || error.message);
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
        <div className={`transition-all duration-300 bg-white shadow-md h-full ${isSidebarOpen ? "w-72" : "w-20"}`}>
          <BrokerSidebar isOpen={isSidebarOpen} />
        </div>

        <div className="flex-1 overflow-auto bg-gray-50 p-4">
          <h2 className="text-2xl font-bold mb-4">All Properties</h2>

          {propertyList.length === 0 ? (
            <p className="text-gray-500">No properties found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {propertyList.map((property) => (
                <div key={property._id} className="bg-white p-4 shadow rounded">
                  <h3 className="font-semibold text-lg">{property.name}</h3>
                  <p className="text-sm text-gray-600">{property.address}</p>
                  {property.image && (
                    <img
                      src={`http://localhost:5001/uploads/${property.image}`}
                      alt={property.name}
                      className="mt-2 h-40 w-full object-cover rounded"
                    />
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

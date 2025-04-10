import React, { useEffect, useState } from "react";
import BrokerNavbar from "../components/BrokerNavbar";
import BrokerSidebar from "../components/BrokerSidebar";

const BrokerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [propertyList, setPropertyList] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://192.168.1.30:5001/api/user/property-list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setPropertyList(data?.properties || []);
          console.log("Fetched properties:", data);
        } else {
          console.warn("API Error:", data.message);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

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
                  {/* You can add image, price, etc., here if available */}
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

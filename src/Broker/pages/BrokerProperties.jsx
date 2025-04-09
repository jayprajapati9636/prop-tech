import React, { useState } from "react";
import BrokerSidebar from "../components/BrokerSidebar";
import BrokerNavbar from "../components/BrokerNavbar";

const AdminPropertyPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`z-20 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}>
        <BrokerSidebar isOpen={isSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 z-30">
          <BrokerNavbar toggleSidebar={toggleSidebar} />
        </div>

        {/* Page Content */}
        <div className="pt-16 px-4 overflow-auto h-full">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">All Properties</h1>
          {/* Render your properties list or table here */}
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-gray-500">Property list or table will be shown here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPropertyPage;

import React, { useState } from "react";
import BrokerNavbar from "../components/BrokerNavbar";
import BrokerSidebar from "../components/BrokerSidebar";
import { Outlet } from "react-router-dom";

const BrokerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`z-50 transition-all duration-300 ${isSidebarOpen ? "w-72" : "w-20"}`}>
        <BrokerSidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 bg-gray-50">
        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 z-40">
          <BrokerNavbar toggleSidebar={toggleSidebar} />
        </div>

        {/* Page Content */}
        <div className="pt-16 px-4 overflow-auto h-full">
          <Outlet /> {/* Nested route will be rendered here */}
        </div>
      </div>
    </div>
  );
};

export default BrokerDashboard;

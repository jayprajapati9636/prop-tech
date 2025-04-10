import React from "react";
import { FaBars } from "react-icons/fa";

const BrokerNavbar = ({ toggleSidebar }) => {
  return (
    <nav className="h-16 bg-blue-600 text-white flex items-center justify-between px-4 shadow">
      <button onClick={toggleSidebar} className="text-xl">
        <FaBars />
      </button>
      <span className="font-semibold">Broker Dashboard</span>
    </nav>
  );
};

export default BrokerNavbar;

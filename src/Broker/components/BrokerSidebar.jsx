import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaPlus, FaSignOutAlt } from "react-icons/fa";

const BrokerSidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored data like token
    localStorage.clear();
    // Redirect to broker login page
    navigate("/brokerlogin");
  };

  return (
    <div className="h-full flex flex-col justify-between p-4">
      <div className="space-y-4">
        <NavLink
          to="/brokerdashboard"
          className="flex items-center space-x-2 text-gray-700 hover:text-black"
        >
          <FaHome />
          {isOpen && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/addproperty"
          className="flex items-center space-x-2 text-gray-700 hover:text-black"
        >
          <FaPlus />
          {isOpen && <span>Add Property</span>}
        </NavLink>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 text-red-600 hover:text-red-800"
      >
        <FaSignOutAlt />
        {isOpen && <span>Logout</span>}
      </button>
    </div>
  );
};

export default BrokerSidebar;

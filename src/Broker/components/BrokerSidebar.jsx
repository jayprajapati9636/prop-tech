import React, { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt } from "react-icons/fa";

const BrokerSidebar = ({ isOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const handleLogout = () => {
    // Clear any stored data like token
    localStorage.clear();
    // Redirect to broker login page
    navigate("/broker/login");
  };

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false); // Close sidebar
      }
    };

    // Adding event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSidebarOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`h-full flex flex-col justify-between p-7 bg-white border-r border-white-200 shadow-lg transition-all duration-300 ${isOpen ? 'w-73' : 'w-20'}`}
    >
      <div className="space-y-6">
        <NavLink
          to="/broker/dashboard"
          className="flex items-center space-x-3 text-gray-700 hover:text-black"
        >
          <FaHome className="text-xl" />
          {isOpen && <span className="text-lg font-semibold">Property's</span>}
        </NavLink>
      </div>

      <div>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-red-600 hover:text-red-800 mt-auto"
        >
          <FaSignOutAlt className="text-xl" />
          {isOpen && <span className="text-lg font-semibold">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default BrokerSidebar;

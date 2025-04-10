import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

const BrokerSidebar = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const sidebarRef = useRef(null);

  const navItems = [
    { label: "Dashboard", icon: <FaHome size={20} />, path: "/brokerdashboard" },
    { label: "AddProperty", icon: <FaPlus size={20} />, path: "/addproperties" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar && closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeSidebar]);

  const handleLogout = () => {
    localStorage.removeItem("brokerToken");
    navigate("/brokerlogin");
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full bg-white shadow-lg border-r border-gray-200 transition-all duration-300 z-50 ${
        isOpen ? "w-72" : "w-20"
      }`}
    >
      <ul className="space-y-2 px-2 pt-6">
        {navItems.map((item, index) => (
          <li
            key={index}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-all ${
              location.pathname === item.path ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            <span className="text-blue-600">{item.icon}</span>
            {isOpen && <span className="text-gray-800">{item.label}</span>}
          </li>
        ))}
      </ul>

      {/* Footer / Logout */}
      <div className="absolute bottom-6 w-full px-4">
        <div
          onClick={handleLogout}
          className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-red-100 text-red-500 transition-all"
        >
          <FaSignOutAlt size={20} />
          {isOpen && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
};

export default BrokerSidebar;
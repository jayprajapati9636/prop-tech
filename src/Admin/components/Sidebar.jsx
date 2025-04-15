import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);

  const navItems = [
    { label: "Dashboard", icon: <FaHome size={20} />, path: "/admindashboard" },
    { label: "Properties", icon: <FaBuilding size={20} />, path: "/Adminproperties" },
    { label: "Users", icon: <FaBuilding size={20} />, path: "/" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (isOpen) toggleSidebar(); // ✅ Fixed: use toggleSidebar
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleSidebar]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/adminlogin");
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full bg-white shadow-lg border-r border-gray-200 transition-all duration-300 z-50 ${
        isOpen ? "w-72" : "w-20"
      }`}
    >
      Sidebar Header
      <div className="p-6">
        <h2
          className={`text-xl font-bold text-blue-600 transition-all duration-300 ${
            !isOpen && "text-center text-sm"
          }`}
        >
          {isOpen ? "" : ""}
        </h2>
      </div>

      {/* Navigation */}
      <ul className="space-y-2 px-2">
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

      {/* Logout */}
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

export default Sidebar;

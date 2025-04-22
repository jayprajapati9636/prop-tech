import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaSignOutAlt,
  FaUserAlt, // Import user icon
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);

  const [user, setUser] = useState(null);

  // Simulate fetching user info (you can replace this with real data from your API)
  useEffect(() => {
    const fetchUserInfo = () => {
      const userData = JSON.parse(localStorage.getItem("user")); // Assume user data is saved in localStorage
      setUser(userData);
    };
    fetchUserInfo();
  }, []);

  const navItems = [
    { label: "Dashboard", icon: <FaHome size={20} />, path: "/admin/dashboard" },
    { label: "Property's", icon: <FaBuilding size={20} />, path: "/Admin/properties" },
    { label: "Customer's", icon: <FaUserAlt size={20} />, path: "/admin/customer" }, // Add Users menu item with icon
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
    navigate("/admin/login");
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full bg-white shadow-lg border-r border-gray-200 transition-all duration-300 z-50 ${
        isOpen ? "w-72" : "w-20"
      }`}
    >
      <div className="p-6 flex flex-col items-center">
        {/* User Info */}
        {user ? (
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <FaUserAlt size={20} className="text-gray-600" />
            </div>
            {isOpen && <span className="text-gray-800 font-medium">{user.name}</span>}
          </div>
        ) : (
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <FaUserAlt size={20} className="text-gray-600" />
          </div>
        )}
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

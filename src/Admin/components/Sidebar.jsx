import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBuilding, FaUsers, FaChartPie, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSidebar]);

  return (
    <div ref={sidebarRef} className={`fixed top-0 left-0 h-full bg-white shadow-lg p-6 w-72 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-80"}`}>
      <h2 className="text-xl font-bold text-blue-600 mb-6">Tec.G</h2>
      <ul className="space-y-2">
        <li className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/admindashboard")}>
          <FaHome size={20} /> <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/properties")}>
          <FaBuilding size={20} /> <span>Properties</span>
        </li>
        <li className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/customers")}>
          <FaUsers size={20} /> <span>Customers</span>
        </li>
        <li className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/reports")}>
          <FaChartPie size={20} /> <span>Reports</span>
        </li>
      </ul>
      <ul className="absolute bottom-10 left-6">
        
      </ul>
    </div>
  );
};

export default Sidebar;

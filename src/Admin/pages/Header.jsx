import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Sidebar Toggle Button */}
        <button onClick={toggleSidebar} className="text-white text-2xl">
          <FaBars />
        </button>

        {/* Logo or Title */}
        <h1 className="text-2xl font-bold">Property Management</h1>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <Link to="/admindashboard" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </nav>

        {/* Profile Icon with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="focus:outline-none">
            <FaUserCircle size={30} className="cursor-pointer" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg py-2 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setShowDropdown(false)}
              >
                Profile
              </Link>
             
              <Link
                to="/adminlogin"
                className="block px-4 py-2 text-red-600 hover:bg-gray-200"
                onClick={() => setShowDropdown(false)}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

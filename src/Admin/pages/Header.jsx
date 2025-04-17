import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle profile dropdown
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
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
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-lg z-50">
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Left: Sidebar toggle + Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={toggleSidebar}
            className="text-white text-3xl hover:text-gray-400 transition duration-300"
          >
            <FaBars />
          </button>
          <Link
            to="/admindashboard"
            className="text-3xl font-bold tracking-wide text-white hover:text-gray-400 transition duration-300"
          >
            Dream Properties
          </Link>
        </div>

        {/* Right: Profile Icon */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="focus:outline-none">
            <FaUserCircle
              size={35}
              className="cursor-pointer text-white hover:text-gray-400 transition duration-300"
            />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-700 text-white rounded-lg shadow-lg py-2 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-600 rounded-lg"
                onClick={() => setShowDropdown(false)}
              >
                Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

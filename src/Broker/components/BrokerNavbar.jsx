import React, { useEffect, useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BrokerNavbar = ({ toggleSidebar }) => {
  const [profile, setProfile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/broker/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch broker profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileClick = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu
  };

  const handleProfilePageNavigation = () => {
    navigate("/broker/profile");
    setIsMenuOpen(false); // Close menu when navigating to profile page
  };

  return (
    <nav className="h-16 bg-blue-700 text-white flex items-center justify-between px-6 shadow-md">
      <button
        onClick={toggleSidebar}
        className="text-2xl hover:text-blue-300 transition duration-200"
      >
        <FaBars />
      </button>

      <span className="text-xl font-semibold tracking-wide">
        Broker Dashboard
      </span>

      {/* Profile Link */}
      <div className="relative">
        <div
          className="flex items-center space-x-2 cursor-pointer hover:text-blue-300 transition"
          onClick={handleProfileClick}
        >
          <FaUserCircle className="text-2xl" />
          {profile && (
            <span className="text-sm font-medium">
              {profile.name || profile.username || "Broker"}
            </span>
          )}
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg w-20">
            <button
              onClick={handleProfilePageNavigation}
              className="block w-full text-left px-2 py-2 hover:bg-gray-100"
            >
              Profile
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default BrokerNavbar;

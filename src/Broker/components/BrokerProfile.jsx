import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BrokerNavbar from "../components/BrokerNavbar";
import BrokerSidebar from "../components/BrokerSidebar";

const BrokerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem("brokerToken");

    if (!token) {
      navigate("/brokerlogin"); // redirect if token missing
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/broker/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data?.broker);
      } catch (err) {
        console.error("Error fetching broker profile:", err.response || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);


  console.log(profile, ":profile")

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-100">
      {/* Navbar */}
      <div className="w-full">
        <BrokerNavbar toggleSidebar={toggleSidebar} />
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 bg-white shadow-md h-full ${
            isSidebarOpen ? "w-72" : "w-20"
          }`}
        >
          <BrokerSidebar isOpen={isSidebarOpen} />
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Broker Profile</h2>

          {loading ? (
            <div className="text-gray-500 text-xl">Loading profile...</div>
          ) : !profile ? (
            <div className="text-red-600 text-xl">Failed to load profile data.</div>
          ) : (
            <div className="max-w-3xl bg-white p-8 shadow-md rounded-lg">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={profile.name || ""}
                    readOnly
                    className="w-full mt-1 border border-gray-300 rounded px-4 py-2 bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={profile.email || ""}
                    readOnly
                    className="w-full mt-1 border border-gray-300 rounded px-4 py-2 bg-gray-100"
                  />
                </div>

               
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrokerProfile;

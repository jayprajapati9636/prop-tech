import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const storedEmail = localStorage.getItem("adminEmail");
    setLoginEmail(storedEmail);

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const res = await axios.get("http://192.168.1.30:5001/api/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = res.data.user || res.data;
        setUser(userData);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        {/* Header */}
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="p-6 pt-24">
          {loading ? (
            <div className="text-center mt-10">Loading profile...</div>
          ) : error ? (
            <div className="text-center text-red-500 mt-10">{error}</div>
          ) : (
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-center mb-4">Admin Profile</h2>
              <div className="text-center">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Profile"
                  className="w-24 h-24 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">{user?.name || "N/A"}</h3>
                <p className="text-gray-600">Email: {user?.email || "N/A"}</p>
                <p className="text-gray-600">Phone: {user?.phone || "N/A"}</p>
                <p className="text-gray-600">Address: {user?.address || "N/A"}</p>

                <hr className="my-4" />
                <p className="text-sm text-gray-500">
                  Logged in with: <span className="font-medium">{loginEmail || "Unknown"}</span>
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;

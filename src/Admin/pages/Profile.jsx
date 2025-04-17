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

        const res = await axios.get("http://localhost:5001/api/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = res.data.admin || res.data;
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
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="p-8 pt-24">
          {loading ? (
            <div className="text-center text-xl text-gray-500 mt-10">Loading profile...</div>
          ) : error ? (
            <div className="text-center text-red-500 text-xl mt-10">{error}</div>
          ) : (
            <div className="space-y-6 w-full max-w-md mx-auto">
              <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-4">
                Admin Profile
              </h2>

              {/* Display Profile Information */}
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700">Full Name</label>
                  <p className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                    {user?.name || "N/A"}
                  </p>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700">Email Address</label>
                  <p className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                    {user?.email || "N/A"}
                  </p>
                </div>
              </div>

              
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;

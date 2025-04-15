import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Editable fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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
        setName(userData?.name || "");
        setEmail(userData?.email || "");
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.put(
        "http://localhost:5001/api/admin/updateprofile",
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Profile updated successfully!");
      setUser(res.data.admin || res.data);
    } catch (err) {
      console.error("Profile update error:", err);
      setError("Failed to update profile");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="p-6 pt-24">
          {loading ? (
            <div className="text-center mt-10">Loading profile...</div>
          ) : error ? (
            <div className="text-center text-red-500 mt-10">{error}</div>
          ) : (
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-center mb-4">Admin Profile</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                  Update Profile
                </button>

                {success && <p className="text-green-600 text-sm">{success}</p>}
                {error && <p className="text-red-600 text-sm">{error}</p>}
              </form>

              <hr className="my-6" />
              <div className="text-sm text-gray-500 text-center">
                Logged in with: <span className="font-medium">{loginEmail || "Unknown"}</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;

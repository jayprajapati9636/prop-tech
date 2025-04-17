import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "./Header";
import { FaSearch } from "react-icons/fa";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return navigate("/adminlogin");

      const response = await axios.get("http://localhost:5001/api/admin/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data.customers)) {
        setUsers(response.data.customers);
        setFilteredUsers(response.data.customers);
      } else {
        setError("Unexpected data format from API");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [navigate]);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`px-4 py-2 border rounded-md mx-1 ${
            currentPage === i ? "bg-blue-600 text-white" : "bg-white text-gray-700"
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="p-8 pt-24">
          <h1 className="text-3xl font-semibold text-gray-800 mb-8">Users Management</h1>

          <div className="flex items-center mb-4 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search user by name..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading users...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gradient-to-r from-gray-600 to-gray-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-sm font-medium text-left">Name</th>
                    <th className="px-6 py-4 text-sm font-medium text-left">Email</th>
                    <th className="px-6 py-4 text-sm font-medium text-left">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50 transition-all duration-200 ease-in-out">
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-gray-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="flex justify-center items-center py-4">
                {renderPagination()}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UsersPage;
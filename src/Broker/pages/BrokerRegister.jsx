import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import brokerImage from "../image/broker1.jpg";
import { useNavigate } from "react-router-dom"; // ⬅️ import useNavigate

const BrokerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ⬅️ initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(
        "http://192.168.1.50:5001/api/broker/register",
        formData
      );
      setMessage("🎉 Registration successful!");
      setFormData({ name: "", email: "", password: "" });

      // Redirect to login after 1 second
      setTimeout(() => {
        navigate("/brokerlogin"); // ⬅️ navigate to login page
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="flex flex-col md:flex-row items-center bg-black text-white rounded-lg overflow-hidden max-w-4xl w-full shadow-lg">
        {/* Left Illustration */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <img
            src={brokerImage}
            alt="Broker Illustration"
            className="w-72 h-auto"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 w-full p-8">
          <div className="text-center mb-6">
            <div className="text-white font-bold mb-2">DREAM PROPERTIES</div>
            <p className="text-gray-400 text-sm">
              Fill in this form to apply for partnership
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="flex items-center bg-white text-black rounded-lg px-4 py-2">
              <FaUser className="mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
                required
              />
            </div>

            {/* Email */}
            <div className="flex items-center bg-white text-black rounded-lg px-4 py-2">
              <FaEnvelope className="mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="flex items-center bg-white text-black rounded-lg px-4 py-2">
              <FaLock className="mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              NEXT
            </button>

            {/* Message */}
            {message && (
              <p className="text-center text-sm mt-2 text-red-400">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BrokerRegister;

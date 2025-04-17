import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import brokerImage from "../image/broker1.jpg";

const BrokerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5001/api/broker/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      localStorage.setItem("token", data.token);
      alert("Registered successfully!");
      navigate("/brokerdashboard");
    } catch (error) {
      console.error("Registration error:", error.message);
      setMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="flex flex-col md:flex-row items-center bg-black text-white rounded-lg overflow-hidden max-w-4xl w-full shadow-lg">
        {/* Left Image */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <img src={brokerImage} alt="Broker Illustration" className="w-72 h-auto" />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 w-full p-8">
          <div className="text-center mb-6">
            <div className="text-white font-bold mb-2">DREAM PROPERTIES</div>
            <p className="text-gray-400 text-sm">
              Create your broker account to get started
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
            <div className="flex items-center bg-white text-black rounded-lg px-4 py-2 relative">
              <FaLock className="mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none pr-8"
                required
              />
              <span
                onClick={togglePassword}
                className="absolute right-3 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Mobile */}
            <div className="flex items-center bg-white text-black rounded-lg px-4 py-2">
              <FaPhone className="mr-2" />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
                required
              />
            </div>

            {/* Address */}
            <div className="flex items-center bg-white text-black rounded-lg px-4 py-2">
              <FaMapMarkerAlt className="mr-2" />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
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
              REGISTER
            </button>

            {/* Message */}
            {message && (
              <p className="text-center text-sm mt-2 text-red-400">{message}</p>
            )}

            {/* Login Link */}
            <div className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link
                to="/brokerlogin"
                className="text-blue-400 hover:underline hover:text-blue-300"
              >
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BrokerRegister;

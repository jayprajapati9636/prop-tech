import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import brokerImage from "../image/broker1.jpg";

const BrokerLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5001/api/broker/login",
        formData
      );
      const token = response.data.token;
      localStorage.setItem("brokerToken", token);
      setMessage("🎉 Login successful!");
      setFormData({ email: "", password: "" });
      navigate("/brokerdashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="flex flex-col md:flex-row items-center bg-black text-white rounded-lg overflow-hidden max-w-4xl w-full shadow-lg">
        {/* Left Illustration */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <img src={brokerImage} alt="Broker Illustration" className="w-72 h-auto" />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 w-full p-8">
          <div className="text-center mb-6">
            <div className="text-white font-bold mb-2">DREAM PROPERTIES</div>
            <p className="text-gray-400 text-sm">
              Please log in to access your broker dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              LOGIN
            </button>

            {/* Message */}
            {message && (
              <p className="text-center text-sm mt-2 text-red-400">{message}</p>
            )}

            {/* Register Link */}
            <div className="text-center text-sm mt-4">
              Don’t have an account?{" "}
              <Link
                to="/brokerregister"
                className="text-blue-400 hover:underline hover:text-blue-300"
              >
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BrokerLogin;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";

// ✅ Validation schema
const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5001/api/admin/login", {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("adminEmail", response.data.email);
      navigate("/admindashboard");
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white-100 to-blue-700 px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl flex overflow-hidden">
        {/* Left Side */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 w-1/2 relative hidden md:flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">WELCOME TO</h2>
          <h4 className="text-sm font-semibold mb-4">DREAM PROPERTY'S</h4>
          <p className="text-sm opacity-90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
          </p>
          {/* Decorative Circles */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full opacity-30"></div>
          <div className="absolute bottom-10 left-20 w-32 h-32 bg-blue-400 rounded-full opacity-50"></div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-7">Admin Login</h2>   

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <div className="relative">
              <FaUser className="absolute top-3.5 left-3 text-gray-500" />
              <input
                type="text"
                placeholder="User Name"
                {...register("email")}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-3.5 left-3 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className="w-full pl-10 pr-16 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-4 text-blue-600 text-sm font-semibold cursor-pointer"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </span>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md transition"
            >
              Login Now!
            </button>

            {/* Divider */}
            <div className="flex items-center gap-2 text-gray-400">
              <hr className="flex-grow border-gray-300" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

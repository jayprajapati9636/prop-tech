import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ Formik form config
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:5001/api/admin/login", values);
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminEmail", response.data.email);
        navigate("/admin/dashboard");
      } catch (error) {
        alert("Login failed. Please try again.");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white-100 to-blue-700 px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl flex overflow-hidden">
        {/* Left Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 w-1/2 relative hidden md:flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">WELCOME TO</h2>
          <h4 className="text-sm font-semibold mb-4">DREAM PROPERTY'S</h4>
          <p className="text-sm opacity-90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
          </p>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full opacity-30"></div>
          <div className="absolute bottom-10 left-20 w-32 h-32 bg-blue-400 rounded-full opacity-50"></div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-7">Admin Login</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <FaUser className="absolute top-3.5 left-3 text-gray-500" />
              <input
                type="text"
                name="email"
                placeholder="User Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <FaLock className="absolute top-3.5 left-3 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full pl-10 pr-16 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-4 text-blue-600 text-sm font-semibold cursor-pointer"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </span>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md transition"
            >
              Login Now!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed")
        .required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Must have at least one uppercase letter")
        .matches(/[0-9]/, "Must have at least one number")
        .matches(/[!@#$%^&*]/, "Must have at least one special character")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setMessage("");
      try {
        const response = await axios.post("http://localhost:5001/api/user/register", values);
        localStorage.setItem("token", response.data.token);
        resetForm();
        navigate("/login");
      } catch (error) {
        setMessage(error.response?.data?.message || "Registration failed. Please try again.");
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-teal-700 flex items-center justify-center px-4">
      <div className="bg-[#0f1f21] text-white p-8 rounded-md shadow-2xl w-full max-w-md">
        <h2 className="text-center text-xl tracking-widest mb-8 font-light text-white">USER REGISTER</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <div className="flex items-center bg-[#dcdcdc] text-black px-4 py-3 rounded-sm">
              <FaUser className="mr-3 text-gray-700" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="bg-transparent w-full outline-none placeholder:text-gray-700"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-400 text-sm mt-1">{formik.errors.name}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="flex items-center bg-[#dcdcdc] text-black px-4 py-3 rounded-sm">
              <FaEnvelope className="mr-3 text-gray-700" />
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                className="bg-transparent w-full outline-none placeholder:text-gray-700"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-400 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center bg-[#dcdcdc] text-black px-4 py-3 rounded-sm relative">
              <FaLock className="mr-3 text-gray-700" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="bg-transparent w-full outline-none placeholder:text-gray-700 pr-8"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-600 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-400 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          {/* Error Message */}
          {message && <div className="text-center text-sm text-red-400">{message}</div>}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-[#477d84] hover:bg-[#3b6b72] text-white py-3 rounded-sm font-medium tracking-wider transition duration-300"
          >
            REGISTER
          </button>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-300 hover:underline">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

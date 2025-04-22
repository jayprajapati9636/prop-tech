import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setMessage("");
      try {
        const response = await axios.post("http://localhost:5001/api/user/login", values);
        localStorage.setItem("token", response.data.token);
        resetForm();
        navigate("/");
      } catch (error) {
        setMessage(error.response?.data?.message || "Login failed. Please try again.");
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-teal-700 flex items-center justify-center px-4">
      <div className="bg-[#0f1f21] text-white p-8 rounded-md shadow-2xl w-full max-w-md">
        <h2 className="text-center text-xl tracking-widest mb-8 font-light text-white">USER LOGIN</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
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
            <div className="flex items-center bg-[#dcdcdc] text-black px-4 py-3 rounded-sm">
              <FaLock className="mr-3 text-gray-700" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-transparent w-full outline-none placeholder:text-gray-700"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-400 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          {/* Extra links */}
          <div className="flex justify-between items-center text-sm text-gray-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-white" />
              Remember me
            </label>
            <Link to="/forgot" className="hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Error message */}
          {message && <div className="text-center text-sm text-red-400">{message}</div>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#477d84] hover:bg-[#3b6b72] text-white py-3 rounded-sm font-medium tracking-wider transition duration-300"
          >
            LOGIN
          </button>
        </form>

        {/* Register Link */}
            <div className="mt-6 text-center text-sm text-gray-300">
                    Dont have an account?{" "}
                    <Link to="/register" className="text-blue-300 hover:underline">
                      Register here
                    </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

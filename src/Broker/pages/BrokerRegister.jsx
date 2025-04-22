import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import brokerImage from "../image/broker1.jpg";

const BrokerRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
        .required("Mobile is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setMessage("");
      try {
        const response = await fetch("http://localhost:5001/api/broker/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Registration failed");

        localStorage.setItem("token", data.token);
        alert("Registered successfully!");
        resetForm();
        navigate("/broker/login");
      } catch (error) {
        console.error("Registration error:", error.message);
        setMessage(error.message);
      }
    },
  });

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
            <p className="text-gray-400 text-sm">Create your broker account to get started</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center bg-white text-black rounded-lg px-4 py-2">
                <FaUser className="mr-2" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <span className="text-sm text-red-400">{formik.errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center bg-white text-black rounded-lg px-4 py-2">
                <FaEnvelope className="mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <span className="text-sm text-red-400">{formik.errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center bg-white text-black rounded-lg px-4 py-2 relative">
                <FaLock className="mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-transparent outline-none pr-8"
                />
                <span onClick={togglePassword} className="absolute right-3 text-gray-500 cursor-pointer">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <span className="text-sm text-red-400">{formik.errors.password}</span>
              )}
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center bg-white text-black rounded-lg px-4 py-2">
                <FaPhone className="mr-2" />
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              {formik.touched.mobile && formik.errors.mobile && (
                <span className="text-sm text-red-400">{formik.errors.mobile}</span>
              )}
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center bg-white text-black rounded-lg px-4 py-2">
                <FaMapMarkerAlt className="mr-2" />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              {formik.touched.address && formik.errors.address && (
                <span className="text-sm text-red-400">{formik.errors.address}</span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              REGISTER
            </button>

            {/* Message */}
            {message && <p className="text-center text-sm mt-2 text-red-400">{message}</p>}

            {/* Login Link */}
            <div className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link to="/broker/login" className="text-blue-400 hover:underline hover:text-blue-300">
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

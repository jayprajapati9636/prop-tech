import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const AdminLogin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const email = data.email.trim().toLowerCase();
    const password = data.password;

    try {
      const response = await axios.post("http://192.168.1.30:5001/api/admin/login", {
        email,
        password,
      });

      const result = response.data;

      // ✅ Store token and email locally
      localStorage.setItem("adminToken", result.token);
      localStorage.setItem("adminEmail", result.email); // Make sure your backend returns this

      console.log("Stored admin email:", result.email); // ✅ Debug

      // ✅ Navigate to dashboard
      navigate("/admindashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong. Please try again.";
      alert(`Login Failed: ${message}`);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-200">
      <div className="bg-white flex flex-col lg:flex-row rounded-xl shadow-md w-full max-w-4xl overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 h-96 lg:h-auto bg-purple-100 flex justify-center items-center">
          <img
            src="/src/Admin/img/loginpage_image.png"
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center text-purple-700">ADMIN LOGIN</h2>
          <p className="text-sm text-gray-500 text-center mb-6">Enter your credentials to continue.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <label>
                <input type="checkbox" className="mr-1" /> Remember me
              </label>
              <a href="#" className="text-purple-700">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

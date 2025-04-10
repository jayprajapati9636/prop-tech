import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BrokerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/broker/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      localStorage.setItem("token", data.token); // ✅ Save token
      alert("Registered successfully!");
      navigate("/broker-dashboard"); // ✅ Navigate to dashboard

    } catch (error) {
      console.error("Registration error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4 p-4 border rounded">
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="text" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Register</button>
    </form>
  );
};

export default BrokerRegister;
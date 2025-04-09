import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const adminDetails = useSelector((state) => state.auth.admin);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await axios.get("http://192.168.1.50:5001/api/admin/get-all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProperties(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          // Handle token expiration or invalid token
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminEmail");
          navigate("/adminlogin");
        } else {
          setError(err.response?.data?.message || "Failed to fetch properties");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [navigate]);

  if (loading) return <p className="text-center mt-10">Loading properties...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Available Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property.id || property._id} className="border p-4 rounded shadow">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{property.name}</h2>
            <p className="text-gray-600">{property.location}</p>
            <p className="text-green-600 font-bold mt-2">${property.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyPage;

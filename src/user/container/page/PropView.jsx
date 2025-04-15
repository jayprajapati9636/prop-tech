
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const PropView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property } = location.state || {};

  const ImageURL = 'http://192.168.1.30:5001/uploads';

  if (!property) {
    return <p className="text-red-600">Property not found.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-500 underline"
        >
          ← Back
        </button>

        <div className="bg-white shadow-lg rounded-lg p-4">
          <img
            src={`${ImageURL}/${property.image}`}
            alt={property.name}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">{property.name}</h2>
          <p className="text-gray-700 mb-2">{property.address}</p>
          <p className="text-gray-600">Type: {property.type}</p>
          <p className="text-gray-600">Price: ₹{property.price}</p>
          {/* Add more fields as needed */}
        </div>
      </div>
    </>
  );
};

export default PropView;

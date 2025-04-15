import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Prop = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        // Choose one of the endpoints below based on your backend
        const response = await axios.get('http://192.168.150.80:5001/api/user/property-list', {
        // const response = await axios.get('http://192.168.1.28:5001/api/user/property-list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPropertyData(response.data);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
        setError(err.message || 'Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p className="text-gray-500">Loading properties...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  const ImageURL = 'http://192.168.1.30:5001/uploads';

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Property Listings</h2>

        {propertyData.length === 0 ? (
          <p className="text-gray-600">No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyData.map((property, index) => (
              <div key={index} className="bg-white p-4 rounded shadow-md">
                {property.image && (
                  <img
                    src={`${ImageURL}/${property.image}`}
                    alt={property.name}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold text-center">{property.name}</h3>
                <p className="text-gray-700 text-center">{property.address}</p>

                {/* Optional See Details Button */}
                {/* <div className="flex justify-center mt-3">
                  <button className="bg-gray-700 text-white rounded px-4 py-2">
                    See Details
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Prop;

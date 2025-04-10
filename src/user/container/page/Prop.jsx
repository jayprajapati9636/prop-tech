import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
 
const PropertyListings = () => {
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
 
        const response = await axios.get('http://192.168.1.30:5001/api/user/property-list', {
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
                  src={property.image}
                  alt={property.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h3 className="text-xl font-semibold">{property.name}</h3>
              <p className="text-gray-700 mb-2">{property.address}</p>
              
            </div>
          ))}
        </div>
      )}
    </div>

    </>
  );
};
 
export default PropertyListings;
  
 
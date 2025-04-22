import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Prop = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const response = await axios.get('http://localhost:5001/api/user/property-list', {
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

  // ✅ Pick one consistent image base URL
  const ImageURL = 'http://192.168.1.28:5001/uploads';

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
              <div
                key={index}
                className="bg-white p-4 rounded shadow-md cursor-pointer"
                onClick={() => setSelectedProperty(property)}
              >
                {property.image && (
                  <img
                    src={`${ImageURL}/${property.image}`}
                    alt={property.name}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold text-center">{property.name}</h3>
                <p className="text-gray-700 text-center">{property.address}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden max-w-md w-full p-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setSelectedProperty(null)}
            >
              ✖
            </button>
            <img
              src={`${ImageURL}/${selectedProperty.image}`}
              alt={selectedProperty.name}
              className="w-full h-56 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedProperty.name}</h2>
            <p className="mb-1"><strong>Address:</strong> {selectedProperty.address}</p>
            <p className="mb-1"><strong>Price:</strong> ₹{selectedProperty.price}</p>
            <p className="mb-1"><strong>Landmark:</strong> {selectedProperty.landmark}</p>
            <p className="mb-1"><strong>Rooms:</strong> {selectedProperty.rooms}</p>
            <p className="mb-1"><strong>Beds:</strong> {selectedProperty.beds}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Prop;

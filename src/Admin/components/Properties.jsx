import React, { useState, useEffect } from "react";

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        return response.json();
      })
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Available Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property.id} className="border p-4 rounded shadow">
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
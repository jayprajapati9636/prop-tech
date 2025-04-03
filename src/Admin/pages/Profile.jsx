import React from "react";

const Profile = () => {
  // Dummy user data (Replace with actual user data from state or API)
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, City, Country",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
        <div className="text-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full mb-4"
          />
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
          <p className="text-gray-600">{user.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

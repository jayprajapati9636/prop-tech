import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrokerNavbar from "../components/BrokerNavbar";
import BrokerSidebar from "../components/BrokerSidebar";
import { AiOutlineSearch } from "react-icons/ai";

const BrokerDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [propertyList, setPropertyList] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isAddPropertyFormVisible, setIsAddPropertyFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatePropertyId, setUpdatePropertyId] = useState("");

  const [propertyForm, setPropertyForm] = useState({
    name: "",
    address: "",
    price: "",
    image: null,
  });

  const ImageURL = "http://localhost:5001/uploads";
  const defaultImage = "https://castlewoodassistedliving.com/wp-content/uploads/2021/01/image-coming-soon-placeholder.png";

  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleAddPropertyForm = () => {
    setIsAddPropertyFormVisible((prev) => !prev);
    setIsEditing(false);
    setPropertyForm({ name: "", address: "", price: "", image: null });
    setUpdatePropertyId("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPropertyForm((prev) => ({ ...prev, image: file }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", propertyForm.name);
    formData.append("price", propertyForm.price);
    formData.append("address", propertyForm.address);
    if (propertyForm.image) {
      formData.append("images", propertyForm.image);
    }

    const token = localStorage.getItem("brokerToken");
    if (!token) return alert("Token missing");

    try {
      const endpoint = isEditing
        ? `http://localhost:5001/api/broker/properties/${updatePropertyId}`
        : "http://localhost:5001/api/broker/property";

      const method = isEditing ? "PUT" : "POST";
      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(isEditing ? { "Content-Type": "application/json" } : {}),
        },
        body: isEditing
          ? JSON.stringify({
              name: propertyForm.name,
              price: propertyForm.price,
              address: propertyForm.address,
            })
          : formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong.");
        return;
      }

      if (isEditing) {
        const updatedList = propertyList.map((item) =>
          item._id === updatePropertyId
            ? { ...item, ...propertyForm }
            : item
        );
        setPropertyList(updatedList);
        setFilteredProperties(updatedList);
        alert("✅ Property updated!");
      } else {
        setPropertyList((prev) => [...prev, data]);
        setFilteredProperties((prev) => [...prev, data]);
        alert("✅ Property added!");
      }

      toggleAddPropertyForm();
    } catch (err) {
      console.error("❌ Error:", err);
      alert("❌ Operation failed.");
    }
  };

  const updateProperty = (property) => {
    setIsAddPropertyFormVisible(true);
    setIsEditing(true);
    setUpdatePropertyId(property._id);
    setPropertyForm({
      name: property.name,
      address: property.address,
      price: property.price,
      image: null, // new image upload is optional
    });
  };

  const deleteProperty = async (propertyId) => {
    const token = localStorage.getItem("brokerToken");
    if (!token) return alert("Token missing");

    try {
      const response = await fetch(`http://localhost:5001/api/broker/properties/${propertyId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const updatedList = propertyList.filter((item) => item._id !== propertyId);
        setPropertyList(updatedList);
        setFilteredProperties(updatedList);
        alert("✅ Property deleted!");
      } else {
        alert("❌ Failed to delete property.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting property.");
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem("brokerToken");
      if (!token) {
        setErrorMsg("Broker token not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5001/api/broker/properties", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setPropertyList(data);
          setFilteredProperties(data);
        } else {
          setErrorMsg("No properties found.");
        }
      } catch (error) {
        setErrorMsg("Failed to fetch properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = propertyList.filter((p) =>
      p.name.toLowerCase().includes(term)
    );
    setFilteredProperties(filtered);
    setCurrentPage(1);
  };

  const paginate = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100 overflow-hidden">
      <BrokerNavbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <div className={`transition-all duration-300 bg-white shadow-md h-full ${isSidebarOpen ? "w-72" : "w-20"}`}>
          <BrokerSidebar isOpen={isSidebarOpen} />
        </div>

        <div className="flex-1 overflow-auto p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            {isEditing ? "Update Property" : isAddPropertyFormVisible ? "Add New Property" : "All Properties"}
          </h2>

          {isAddPropertyFormVisible ? (
            <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <div className="mb-4">
                <label className="block font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={propertyForm.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Address</label>
                <input
                  type="text"
                  name="address"
                  value={propertyForm.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  value={propertyForm.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={toggleAddPropertyForm} className="text-red-500 hover:text-red-700">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                  {isEditing ? "Update Property" : "Add Property"}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="p-2 border border-gray-300 rounded-md w-full max-w-md"
                  placeholder="Search by property name"
                />
                <AiOutlineSearch className="ml-2 text-xl text-gray-500" />
              </div>

              <button
                onClick={toggleAddPropertyForm}
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 mb-4"
              >
                Add New Property
              </button>

              {loading ? (
                <div className="text-gray-500 text-xl">Loading...</div>
              ) : errorMsg ? (
                <div className="text-red-500 text-xl">{errorMsg}</div>
              ) : (
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full table-auto border border-gray-300 bg-white rounded-lg shadow">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold border-b">Image</th>
                        <th className="px-6 py-3 text-left font-semibold border-b">Name</th>
                        <th className="px-6 py-3 text-left font-semibold border-b">Address</th>
                        <th className="px-6 py-3 text-left font-semibold border-b">Price</th>
                        <th className="px-6 py-3 text-center font-semibold border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProperties.map((property) => (
                        <tr key={property._id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 border-b">
                            <img
                              src={property.image ? `${ImageURL}/${property.image}` : defaultImage}
                              alt={property.name}
                              className="w-24 h-16 object-cover rounded"
                            />
                          </td>
                          <td className="px-6 py-4 border-b">{property.name}</td>
                          <td className="px-6 py-4 border-b">{property.address}</td>
                          <td className="px-6 py-4 border-b text-gray-800 font-medium">₹{property.price}</td>
                          <td className="px-6 py-4 border-b text-center space-x-2">
                            <button
                              onClick={() => updateProperty(property)}
                              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => deleteProperty(property._id)}
                              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 mx-1 border rounded-lg bg-blue-500 text-white"
                >
                  Prev
                </button>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 mx-1 border rounded-lg bg-blue-500 text-white"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrokerDashboard;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// User Imports
import Register from "../user/container/auth/Register";
import Login from "../user/container/auth/Loging";
import HomePage from "../user/container/page/Home";
import UserAboutpage from "../user/container/page/aboutpage";
import Forgot from "../user/container/auth/Forgot";
import Navbar from "../user/container/page/Navbar";
import Prop from "../user/container/page/Prop";

// Admin Imports
import Adminlogin from "../Admin/pages/Adminlogin";
import AdminDashboard from "../Admin/pages/AdminDashboard";
import Profile from "../Admin/pages/Profile";
import Header from "../Admin/pages/Header";
import AdminProperties from "../Admin/components/AdminProperties";
import About from "../Admin/pages/About";
import Customer from "../Admin/pages/Customer"; // Make sure this exists

// Broker Imports
import BrokerRegister from "../Broker/pages/BrokerRegister";
import BrokerLogin from "../Broker/pages/BrokerLogin";
import BrokerDashboard from "../Broker/components/BrokerDashboard";
import BrokerNavbar from "../Broker/components/BrokerNavbar";
import BrokerSidebar from "../Broker/components/BrokerSidebar";
import BrokerProperties from "../Broker/pages/BrokerProperties";
import AddProperty from "../Broker/pages/AddProperty";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/userabout" element={<UserAboutpage />} />
        <Route path="/prop" element={<Prop />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/navbar" element={<Navbar />} />
        
        {/* Admin Routes */}
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/header" element={<Header />} />
        <Route path="/adminproperties" element={<AdminProperties />} />
        <Route path="/about" element={<About />} />
        <Route path="/customers" element={<Customer />} />
        
        {/* Broker Routes */}
        <Route path="/brokerregister" element={<BrokerRegister />} />
        <Route path="/brokerlogin" element={<BrokerLogin />} />
        <Route path="/brokerdashboard" element={<BrokerDashboard />} />
        <Route path="/brokernavbar" element={<BrokerNavbar />} />
        <Route path="/brokersidebar" element={<BrokerSidebar />} />
        <Route path="/brokerproperties" element={<BrokerProperties />} />
        <Route path="/addproperty" element={<AddProperty />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

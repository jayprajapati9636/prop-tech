import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import { FaBars } from "react-icons/fa";

const BrokerNavbar = ({ collapsed, setCollapsed }) => {
  return (
    <AppBar position="fixed" className="bg-blue-600 z-50">
      <Toolbar className="flex justify-between w-full">
        {/* Left side - Toggle Button */}
        <div className="flex items-center space-x-4">
          <IconButton onClick={() => setCollapsed(!collapsed)} className="text-white">
            <FaBars />
          </IconButton>
          <Typography variant="h6" className="text-white font-bold hidden sm:block">
            Dream Properties
          </Typography>
        </div>

        {/* Right side - Profile Icon */}
        <Avatar alt="Profile" src="/profile.jpg" className="cursor-pointer" />
      </Toolbar>
    </AppBar>
  );
};

export default BrokerNavbar;

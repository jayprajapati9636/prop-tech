import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const handleHomeClick = () => {
    navigate("/");
  };
  

  const handleProfileClick = () => {
    navigate("/register");
    handleMenuClose();
  };

  const handleServiceClick =() =>{
    navigate("/service")
  }
  const handlePropertiesClick=()=>{
    navigate("/prop")
  }
  const handleupdateClick=()=>{
    navigate("/updateprofile")
  }

  return (
    <AppBar position="absolute" sx={{ backgroundColor: "gray" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo */}
        <Typography variant="h6" sx={{ flexShrink: 0 }}>
          Dreame Properties
        </Typography>

        {/* Center: Nav Buttons */}
        <Box sx={{ display: "flex", gap: 2, flexGrow: 1, justifyContent: "center" }}>
          <Button color="inherit" onClick={handleHomeClick}>Home</Button>
         <Button color="inherit" onClick={handlePropertiesClick} >Properties</Button>
                     
          <Button color="inherit" onClick={handleServiceClick} >Services</Button>
                      
          
        </Box>

        {/* Right: User Icon */}
        <Box sx={{ flexShrink: 0 }}>
          <IconButton edge="end" color="inherit" onClick={handleMenuClick}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleupdateClick}>Update</MenuItem>

            
            
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

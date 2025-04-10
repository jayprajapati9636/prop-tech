import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom"; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null); // For menu anchor
  const [openMenu, setOpenMenu] = useState(false); // To control menu visibility
  const [cartCount, setCartCount] = useState(3); // Example cart count, can be dynamic
  const navigate = useNavigate();

  // Handle opening the menu when the icon button is clicked
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  // Handle closing the menu
  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  // Example handler for registration
  const handleRegisterClick = () => {
    console.log('Redirect to Registration page');
    navigate("/register"); 
    // Navigate or perform registration logic
    handleMenuClose();
  };

  // Example handler for updating the profile
  const handleUpdateProfileClick = () => {
    console.log('Redirect to Update Profile page');
    navigate("/update-profile");
    // Navigate or perform update logic
    handleMenuClose();
  };
  const handleCartClick = () => {
    console.log('Redirect to Cart page');
    navigate('/cart'); // Navigate to the Cart page
  };

  return (
    <div>
      <AppBar position="absolute" sx={{ backgroundColor: "gray" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dreame Properties
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Properties</Button>
          <Button color="inherit">Services</Button>
          <Button color="inherit">About Us</Button>
          <Button color="inherit">Agent</Button>

          {/* Account Icon and Menu */}
          <IconButton edge="end" color="inherit" onClick={handleMenuClick}>
            <AccountCircleIcon />
          </IconButton>

          {/* Menu for Registration and Update Profile */}
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleRegisterClick}>Registration</MenuItem>
            <MenuItem onClick={handleUpdateProfileClick}>Update Profile</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

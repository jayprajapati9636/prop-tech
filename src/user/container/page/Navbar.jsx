import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom"; 


// ...imports

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  // ✅ Moved outside
  const handleHomeClick = () => {
    navigate("/");
  };

  const handleRegisterClick = () => {
    console.log('Redirect to Registration page');
    navigate("/register");
    handleMenuClose();
  };

  const handleUpdateProfileClick = () => {
    navigate("/update-profile");
    handleMenuClose();
  };

  return (
    <div>
      <AppBar position="absolute" sx={{ backgroundColor: "gray" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dreame Properties
          </Typography>
          <Button color="inherit" onClick={handleHomeClick}>Home</Button>
          <Button color="inherit">Properties</Button>
          <Button color="inherit">Services</Button>
          <Button color="inherit">About Us</Button>
          <Button color="inherit">Agent</Button>

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
            <MenuItem onClick={handleRegisterClick}>Registration</MenuItem>
            <MenuItem onClick={handleUpdateProfileClick}>Update Profile</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

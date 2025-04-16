import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/register');
    handleMenuClose();
  };

  const handleServiceClick = () => {
    navigate('/service');
  };

  const handlePropertiesClick = () => {
    navigate('/prop');
  };

  const handleUpdateClick = () => {
    navigate('/updateprofile');
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="absolute" sx={{ backgroundColor: 'gray' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left: Logo */}
        <Typography variant="h6" sx={{ flexShrink: 0 }}>
          Dreame Properties
        </Typography>

        {/* Center: Nav Buttons */}
        <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, justifyContent: 'center' }}>
          <Button color="inherit" onClick={handleHomeClick}>Home</Button>
          <Button color="inherit" onClick={handlePropertiesClick}>Properties</Button>
          <Button color="inherit" onClick={handleServiceClick}>Services</Button>
        </Box>

        {/* Right: User Options */}
        <Box sx={{ flexShrink: 0 }}>
          <IconButton edge="end" color="inherit" onClick={handleMenuClick}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {!isLoggedIn ? (
              <>
                <MenuItem onClick={handleProfileClick}>Register / Login</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleUpdateClick}>Update Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

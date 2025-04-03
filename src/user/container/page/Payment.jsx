import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import AccountCircle for the user icon

function HomePage() {
  const propertyImages = [
    "/Image/img.jpg",
    "/Image/img1.jpg",
    "/Image/img3.jpg",
    "/Image/img10.jpg",
  ];

  const words = ["Smart Homes", "Commercial Properties", "Luxury Apartments"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null); // State to manage the anchor element for the menu
  const [openMenu, setOpenMenu] = useState(false); // State to manage menu open/close

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const properties = [
    {
      id: 1,
      title: "Modern Smart Home",
      images: ["/Image/Home1.jpg", "/Image/Home2.jpg", "/Image/Home3.jpg"],
      description:
        "A state-of-the-art smart home with advanced automation and energy-saving features. Ideal for modern living.",
      price: "$1,500,000",
      size: "2500 sq.ft",
      bed: "2 bed",
      bath: "3 bath",
      rating: "(4.9/5.0)",
    },
    {
      id: 2,
      title: "Luxury Apartment",
      images: ["/Image/Ap1.jpg", "/Image/Ap2.jpg", "/Image/Home4.jpg"],
      description:
        "A luxury apartment located in the heart of the city, with panoramic views and premium amenities.",
      price: "$850,000",
      size: "1800 sq.ft",
      bed: "3 bed",
      bath: "2 bath",
      rating: "(5.0/5.0)",
    },
    {
      id: 3,
      title: "Commercial Office Space",
      images: ["/Image/img.jpg", "/Image/img4.jpg", "/Image/Home4.jpg"],
      description:
        "A premium office space in a prime business location with modern facilities and excellent accessibility.",
      price: "$2,000,000",
      size: "3500 sq.ft",
      bed: "5 offices",
      bath: "3 bath",
      rating: "(4.8/5.0)",
    },
    {
      id: 4,
      title: "Resort",
      images: ["/Image/Resort1.jpg", "/Image/Resort2.jpg", "/Image/Resort3.jpg"],
      description:
        "A premium office space in a prime business location with modern facilities and excellent accessibility.",
      price: "$2,000,000",
      size: "3500 sq.ft",
      bed: "5 offices",
      bath: "3 bath",
      rating: "(4.8/5.0)",
    },
  ];

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseDetails = () => {
    setSelectedProperty(null);
  };

  // Handle menu open
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <Box sx={{ maxWidth: "100%", height: "100vh", position: "relative", textAlign: "center", color: "white" }}>
        <AppBar position="absolute" sx={{ opacity: "0.5", backgroundColor: "gray" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dreame Properties
            </Typography>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Properties</Button>
            <Button color="inherit">Services</Button>
            <Button color="inherit">About Us</Button>

            {/* User Icon */}
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuClick} // Open menu on click
            >
              <AccountCircleIcon />
            </IconButton>

            {/* Menu for Register/Other Options */}
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose} // Close menu
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleMenuClose}>Register</MenuItem>
              <MenuItem onClick={handleMenuClose}>Login</MenuItem>
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${propertyImages[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)",
            zIndex: -1,
          }}
        ></Box>

        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <Typography variant="h3" fontWeight="bold">Discover Your Dream Property</Typography>
          <Typography variant="h4" fontWeight="bold">
            Explore top{" "}
            <motion.span
              key={currentIndex}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              style={{ display: "inline-block" }}
            >
              {words[currentIndex]}
            </motion.span>{" "}
            Listings
          </Typography>
          <Typography variant="body1" color="textSecondary" mt={1} sx={{ color: "white" }}>
            Discover the best properties in the market, from smart homes to commercial spaces, tailored to meet your needs.
          </Typography>
        </Box>
      </Box>
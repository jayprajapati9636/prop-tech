import React, { useState, useEffect, useRef } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from "@mui/material";
import Grid from '@mui/material/Grid';
import { motion } from "framer-motion";  
import CloseIcon from "@mui/icons-material/Close"; 
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; 
import { useNavigate } from "react-router-dom"; 
import { Facebook as FacebookIcon, LinkedIn as LinkedInIcon, Twitter as TwitterIcon, Pinterest as PinterestIcon, Instagram as InstagramIcon } from '@mui/icons-material';

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

  const [anchorEl, setAnchorEl] = useState(null); 
  const [openMenu, setOpenMenu] = useState(false); 
  const navigate = useNavigate();
  const propertiesButtonRef = useRef(null); // Use ref for the Properties button
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // images
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

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const handleRegisterClick = () => {
    console.log("Navigating to /register");
    navigate("/register"); 
    setOpenMenu(false); 
  };

  // Navigate to the Update Profile Page
  const handleUpdateProfileClick = () => {
    console.log("update-profile");
    navigate("/update");
    setOpenMenu(false); 
  };

  // Slide effect for Properties button
  const handlePropertiesClick = () => {
    setIsSliding(true); // Trigger the sliding effect
    setTimeout(() => {
      navigate("/properties"); // After the animation, navigate to the properties page
    }, 2000); // Set the timeout to match the duration of the animation
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
            <Button color="inherit" ref={propertiesButtonRef} onClick={handlePropertiesClick}>
              Properties
            </Button>
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

      {/* Properties List Section */}
      <motion.div
        initial={{ x: '100%' }}
        animate={isSliding ? { x: 0 } : { x: '100%' }}
        transition={{ duration: 2 }}
        style={{ marginTop: '30px' }}
      >
        <Box sx={{ padding: "50px", backgroundColor: "#f9f9f9" }}>
          <Typography variant="h6" textAlign="center">Our Listings</Typography>
          <Typography variant="h3" textAlign="center" fontWeight="bold">
            Featured <span style={{ color: "#3f51b5" }}>Properties</span>
          </Typography>
          <Typography variant="body1" textAlign="center" color="textSecondary" mb={4}>
            Explore our curated selection of properties for sale and rent, including residential, commercial, and luxury options.
          </Typography>

          {properties.map((property) => (
            <Box
              key={property.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                marginBottom: "15px",
              }}
            >
              <Box sx={{ width: "30%", padding: "10px" }}>
                <img
                  src={property.images[0]}
                  alt={property.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>

              <Box sx={{ width: "40%", padding: "10px" }}>
                <Typography variant="h6" fontWeight="bold">{property.title}</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography variant="body2">{property.bath}</Typography>
                  <Typography variant="body2">{property.bed}</Typography>
                  <Typography variant="body2">{property.size}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" mt={1}>
                  {property.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="primary">{property.rating}</Typography>
                </Box>
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <Button variant="contained" color="primary" fullWidth onClick={() => handleViewDetails(property)}>
                    View Details
                  </Button>
                </Box>
              </Box>

              <Box sx={{ width: "25%", padding: "10px", textAlign: "center" }}>
                <Typography variant="h6" fontWeight="bold">{property.price}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </motion.div>
    </>
  );
}

export default HomePage;

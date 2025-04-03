import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close"; 
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; 

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
              onClick={handleMenuClick} 
            >
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
              <MenuItem onClick={handleMenuClose}>Register</MenuItem>

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

      {/* Property Details Modal */}
      {selectedProperty && (
        <Box sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}>
          <Box sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "800px",
            width: "100%",
            position: "relative",
          }}>
            {/* Close button (X Icon) */}
            <IconButton
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "gray",
                fontSize: "30px",
              }}
              onClick={handleCloseDetails}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h4" fontWeight="bold">{selectedProperty.title}</Typography>
            <Typography variant="body2" color="textSecondary">{selectedProperty.description}</Typography>
            <Typography variant="body2" color="textSecondary" mt={2}>
              <strong>Price:</strong> {selectedProperty.price}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Size:</strong> {selectedProperty.size}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Bedrooms:</strong> {selectedProperty.bed}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Bathrooms:</strong> {selectedProperty.bath}
            </Typography>

            {/* Image Gallery */}
            <Box sx={{ display: "flex", overflowX: "auto", mt: 3 }}>
              {selectedProperty.images.map((image, index) => (
                <Box key={index} sx={{ minWidth: "250px", marginRight: "10px" }}>
                  <img
                    src={image}
                    alt={`Property Image ${index + 1}`}
                    style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
                  />
                </Box>
              ))}
            </Box>

            <Box sx={{ textAlign: "center", marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
              
              <Button variant="contained" color="secondary">
                Buy
              </Button>
            </Box>
          </Box>
        </Box>
      )}

<div>
  <div>
    <h1 style={{textAlign: "center", fontSize: "35px", fontWeight: "bold", marginTop: "50px"}}>Our Service</h1>
    <h6 style={{textAlign: "center", fontSize: "18px", paddingBottom: "40px", color: "#6c757d"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum sit ea nobis quae vero voluptatibus.</h6>

    <div style={{display: "flex", justifyContent: "space-around", alignItems: "flex-start", flexWrap: "wrap", gap: "20px", padding: "0 20px"}}>
      
      <div style={{backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "22%", padding: "20px", textAlign: "center", transition: "transform 0.3s ease-in-out"}}>
        <h1 style={{fontSize: "50px", color: "#ff4081"}}>img</h1>
        <h3 style={{fontSize: "22px", fontWeight: "bold", color: "#333"}}>Quality Properties</h3>
        <p style={{fontSize: "14px", color: "#6c757d", marginBottom: "20px"}}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
        <a href="#" style={{textDecoration: "none", color: "blue", fontWeight: "bold"}}>Read more</a>
      </div>

      <div style={{backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "22%", padding: "20px", textAlign: "center", transition: "transform 0.3s ease-in-out"}}>
        <h1 style={{fontSize: "50px", color: "#ff4081"}}>img</h1>
        <h3 style={{fontSize: "22px", fontWeight: "bold", color: "#333"}}>Property for Sale</h3>
        <p style={{fontSize: "14px", color: "#6c757d", marginBottom: "20px"}}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
        <a href="#" style={{textDecoration: "none", color: "blue", fontWeight: "bold"}}>Read more</a>
      </div>

      <div style={{backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "22%", padding: "20px", textAlign: "center", transition: "transform 0.3s ease-in-out"}}>
        <h1 style={{fontSize: "50px", color: "#ff4081"}}>img</h1>
        <h3 style={{fontSize: "22px", fontWeight: "bold", color: "#333"}}>Top Rated Agent</h3>
        <p style={{fontSize: "14px", color: "#6c757d", marginBottom: "20px"}}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
        <a href="#" style={{textDecoration: "none", color: "blue", fontWeight: "bold"}}>Read more</a>
      </div>

      <div style={{backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "22%", padding: "20px", textAlign: "center", transition: "transform 0.3s ease-in-out"}}>
        <h1 style={{fontSize: "50px", color: "#ff4081"}}>img</h1>
        <h3 style={{fontSize: "22px", fontWeight: "bold", color: "#333"}}>House for Sale</h3>
        <p style={{fontSize: "14px", color: "#6c757d", marginBottom: "20px"}}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
        <a href="#" style={{textDecoration: "none", color: "blue", fontWeight: "bold"}}>Read more</a>
      </div>

    </div>
  </div>
</div>

    </>

    
  );
}

export default HomePage;

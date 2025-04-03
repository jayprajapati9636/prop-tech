import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';

// FadeMenu Component
const FadeMenu = ({ anchorEl, open, handleClose, handleRegisterClick }) => (
  <Menu
    id="fade-menu"
    MenuListProps={{
      'aria-labelledby': 'fade-button',
    }}
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    TransitionComponent={Fade}
  >
    {/* Pass handleRegisterClick to the MenuItem onClick */}
    <MenuItem onClick={() => { handleRegisterClick(); handleClose(); }}>Register</MenuItem>
  </Menu>
);

function HomePage() {
  const navigate = useNavigate(); 

  
  const handleRegisterClick = () => {
    navigate("/User");  
  };

  const propertyImages = [
    "/image/img.jpg", 
    "/image/img1.jpg", 
    "/image/img3.jpg", 
    "/image/img10.jpg", 
  ];

  const words = ["Smart Homes", "Commercial Properties", "Luxury Apartments"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Property Data
  const properties = [
    {
      id: 1,
      title: "Modern Smart Home",
      images: ["/image/Home1.jpg","/image/Home2.jpg","/image/Home3.jpg"],  
      description: "A state-of-the-art smart home with advanced automation and energy-saving features. Ideal for modern living.",
      price: "$1,500,000",
      size: "2500 sq.ft",
      bed: "2 bed",
      bath: "3 bath",
      rating: "(4.9/5.0)",
    },
    {
      id: 2,
      title: "Luxury Apartment",
      images: ["/image/Ap1.jpg", "/image/Ap2.jpg","/image/Ap3.jpg",], 
      description: "A luxury apartment located in the heart of the city, with panoramic views and premium amenities.",
      price: "$850,000",
      size: "1800 sq.ft",
      bed: "3 bed",
      bath: "2 bath",
      rating: "(5.0/5.0)",
    },
    {
      id: 3,
      title: "Commercial Office Space",
      images: ["/image/img.jpg", "/image/img4.jpg", "/image/office.jpg"],  
      description: "A premium office space in a prime business location with modern facilities and excellent accessibility.",
      price: "$2,000,000",
      size: "3500 sq.ft",
      bed: "5 offices",
      bath: "3 bath",
      rating: "(4.8/5.0)",
    },
    {
      id: 4,
      title: "Resort",
      images: ["/image/Resort1.jpg", "/image/Resort2.jpg","/image/Resort3.jpg",],  
      description: "A premium office space in a prime business location with modern facilities and excellent accessibility.",
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

  // Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ maxWidth: "100%", height: "100vh", position: "relative", textAlign: "center", color: "white" }}>
        <AppBar position="absolute" sx={{ opacity: "0.5", backgroundColor: "gray" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>PROPERTY TECH</Typography>
            <Button
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{color:"white"}}
            >
              Home
            </Button>
            <FadeMenu anchorEl={anchorEl} open={open} handleClose={handleClose} handleRegisterClick={handleRegisterClick} />
            <Button color="inherit">Services</Button>
            <Button color="inherit">Properties</Button>
            <Button color="inherit">About Us</Button>
            <Button color="inherit">Buy</Button>
            <Button color="inherit">Seller</Button>
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
            Explore top {" "}
            <motion.span
              key={currentIndex}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              style={{ display: "inline-block" }}
            >
              {words[currentIndex]}
            </motion.span> 
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
          }}>
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

            <Box sx={{ textAlign: "center", marginTop: "20px" }}>
              <Button variant="contained" color="secondary" onClick={handleCloseDetails}>
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      )}

<section class="features-1">
      <div style={{            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "800px",
            width: "100%",}}>
        <div style={{}}>
          <div class="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
            <div class="box-feature">
              <span class="flaticon-house"></span>
              <h3 class="mb-3">Our Properties</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates, accusamus.
              </p>
              <p><a href="#" class="learn-more">Learn More</a></p>
            </div>
          </div>
          <div class="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="500">
            <div class="box-feature">
              <span class="flaticon-building"></span>
              <h3 class="mb-3">Property for Sale</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates, accusamus.
              </p>
              <p><a href="#" class="learn-more">Learn More</a></p>
            </div>
          </div>
          <div class="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="400">
            <div class="box-feature">
              <span class="flaticon-house-3"></span>
              <h3 class="mb-3">Real Estate Agent</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates, accusamus.
              </p>
              <p><a href="#" class="learn-more">Learn More</a></p>
            </div>
          </div>
          <div class="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="600">
            <div class="box-feature">
              <span class="flaticon-house-1"></span>
              <h3 class="mb-3">House for Sale</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates, accusamus.
              </p>
              <p><a href="#" class="learn-more">Learn More</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>

      
    </>
  );
}

export default HomePage;

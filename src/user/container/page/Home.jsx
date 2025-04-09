import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Badge } from "@mui/material";
import Grid from "@mui/material/Grid";
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
        "A luxury resort with serene views and world-class amenities.",
      price: "$3,000,000",
      size: "5000 sq.ft",
      bed: "8 rooms",
      bath: "6 baths",
      rating: "(4.9/5.0)",
    },
  ];

  const handleViewDetails = (property) => {
    setSelectedProperty(property); // Set the selected property
  };

  const handleCloseDetails = () => {
    setSelectedProperty(null); // Close the modal by resetting selectedProperty
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


  

  const handleViewAllClick = () => {
    navigate('/prop'); // Navigate to the properties page when "View All" is clicked
  };
  return (
    <>
      <Box sx={{ maxWidth: "100%", height: "100vh", position: "relative", textAlign: "center", color: "white" }}>
        <AppBar position="absolute" sx={{ backgroundColor: "gray" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dreame Properties
            </Typography>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Properties</Button>
            <Button color="inherit">Services</Button>
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
              
            </Menu>
          </Toolbar>
        </AppBar>

        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${propertyImages[currentIndex]})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(8px)", zIndex: -1 }}></Box>

        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <Typography variant="h3" fontWeight="bold">Discover Your Dream Property</Typography>
          <Typography variant="h4" fontWeight="bold">
            Explore top{" "}
            <motion.span key={currentIndex} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.5 }} style={{ display: "inline-block" }}>
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
        <Typography variant="h3" textAlign="center" fontWeight="bold">Featured <span style={{ color: "#3f51b5" }}>Properties</span></Typography>
        <Typography variant="body1" textAlign="center" color="textSecondary" mb={4}>
          Explore our curated selection of properties for sale and rent, including residential, commercial, and luxury options. <a href="#" onClick={handleViewAllClick} style={{ color: "blue",cursor:"pointer" }}>View All</a>
        </Typography>

        {properties.map((property) => (
          <Box key={property.id} sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", padding: "20px", marginBottom: "15px" }}>
            <Box sx={{ width: "30%", padding: "10px" }}>
              <img src={property.images[0]} alt={property.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Box>

            <Box sx={{ width: "40%", padding: "10px" }}>
              <Typography variant="h6" fontWeight="bold">{property.title}</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Typography variant="body2">{property.bath}</Typography>
                <Typography variant="body2">{property.bed}</Typography>
                <Typography variant="body2">{property.size}</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" mt={1}>{property.description}</Typography>
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
        <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <Box sx={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", maxWidth: "800px", width: "100%", position: "relative" }}>
            <IconButton sx={{ position: "absolute", top: "10px", right: "10px", color: "gray", fontSize: "30px" }} onClick={handleCloseDetails}>
              <CloseIcon />
            </IconButton>

            <Typography variant="h4" fontWeight="bold">{selectedProperty.title}</Typography>
            <Typography variant="body2" color="textSecondary">{selectedProperty.description}</Typography>
            <Typography variant="body2" color="textSecondary" mt={2}><strong>Price:</strong> {selectedProperty.price}</Typography>
            <Typography variant="body2" color="textSecondary"><strong>Size:</strong> {selectedProperty.size}</Typography>
            <Typography variant="body2" color="textSecondary"><strong>Bedrooms:</strong> {selectedProperty.bed}</Typography>
            <Typography variant="body2" color="textSecondary"><strong>Bathrooms:</strong> {selectedProperty.bath}</Typography>

            {/* Image Gallery */}
            <Box sx={{ display: "flex", overflowX: "auto", mt: 3 }}>
              {selectedProperty.images.map((image, index) => (
                <Box key={index} sx={{ minWidth: "250px", marginRight: "10px" }}>
                  <img src={image} alt={`Property Image ${index + 1}`} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
                </Box>
              ))}
            </Box>

            <Box sx={{ textAlign: "center", marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
              <Button variant="contained" color="secondary">Contact</Button>
            </Box>
          </Box>
        </Box>
      )}

<div>
  <div>
    <h1 style={{textAlign: "center", fontSize: "35px", fontWeight: "bold", marginTop: "50px"}}>Our Service</h1>
    <h6 style={{textAlign: "center", fontSize: "18px", paddingBottom: "40px", color: "#6c757d"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum sit ea nobis quae vero voluptatibus.</h6>

    <div style={{display: "flex", justifyContent: "space-around", alignItems: "flex-start", flexWrap: "wrap", gap: "20px", padding: "0 20px"}}>
      
      <div style={{backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "22%", padding: "20px", textAlign: "center", transition: "transform 0.3s ease-in-out", display:"flex", flexFlow:'column',alignItems:"center"}}>
      <img src="/public/Image/salehouse.png" alt="" style={{width:"100px",height:"70px",}}/>
        <h3 style={{fontSize: "22px", fontWeight: "bold", color: "#333"}}>Quality Properties</h3>
        <p style={{fontSize: "14px", color: "#6c757d", marginBottom: "20px"}}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
        <a href="#" style={{textDecoration: "none", color: "blue", fontWeight: "bold"}}>Read more</a>
      </div>

      <div style={{backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "22%", padding: "20px", textAlign: "center", transition: "transform 0.3s ease-in-out",display:"flex", flexFlow:'column',alignItems:"center"}}>
      <img src="/public/Image/property.png" alt="" style={{width:"100px",height:"70px",}}/>
        <h3 style={{fontSize: "22px", fontWeight: "bold", color: "#333"}}>Property for Sale</h3>
        <p style={{fontSize: "14px", color: "#6c757d", marginBottom: "20px"}}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
        <a href="#" style={{textDecoration: "none", color: "blue", fontWeight: "bold"}}>Read more</a>
      </div>

      <div style={{backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "22%", padding: "20px", textAlign: "center", transition: "transform 0.3s ease-in-out",display:"flex", flexFlow:'column',alignItems:"center"}}>
      <img src="/public/Image/agent_16949154.png" alt="" style={{width:"100px",height:"70px",}}/>
        <h3 style={{fontSize: "22px", fontWeight: "bold", color: "#333"}}>Top Rated Agent</h3>
        <p style={{fontSize: "14px", color: "#6c757d", marginBottom: "20px"}}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
        <a href="#" style={{textDecoration: "none", color: "blue", fontWeight: "bold"}}>Read more</a>
      </div>

      <div style={{backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "22%", padding: "20px", textAlign: "center", transition: "transform 0.3s ease-in-out",display:"flex", flexFlow:'column',alignItems:"center"}}>
      <img src="/public/Image/house-sale_8257260.png" alt="" style={{width:"100px",height:"70px",}} />
        <h3 style={{fontSize: "22px", fontWeight: "bold", color: "#333"}}>House for Sale</h3>
        <p style={{fontSize: "14px", color: "#6c757d", marginBottom: "20px"}}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
        <a href="#" style={{textDecoration: "none", color: "blue", fontWeight: "bold"}}>Read more</a>
      </div>

      

    </div>
  </div>
</div>


    <div style={{ backgroundColor: "#f9f9f9", color: "black", padding: "50px 0px",marginTop:"40px", }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "30px", // Adds gap between the footer columns
        }}>
          {/* Contact Section */}
          <div className="col-lg-4" style={{ flex: "1", minWidth: "300px" }}>
            <div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: '20px' }}>Contact</h3>
              <address>43 Raymouth Rd. Baltemoer, London 3910</address>
              <ul className="list-unstyled links">
                <li><a href="tel://11234567890">+1(123)-456-7890</a></li>
                <li><a href="tel://11234567890">+1(123)-456-7890</a></li>
                <li><a href="mailto:info@mydomain.com">info@mydomain.com</a></li>
              </ul>
            </div>
          </div>

          {/* Sources Section */}
          <div className="col-lg-4" style={{ flex: "1", minWidth: "300px", justifyContent:"center" }}>
          <div>
  <h3 style={{ fontSize: "1.8rem", marginBottom: '20px' }}>Sources</h3>
  <div style={{ display: 'flex', gap: '50px' }}>
    <ul className="list-unstyled">
      <li><a href="#">About us</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Vision</a></li>
      <li><a href="#">Mission</a></li>
      <li><a href="#">Terms</a></li>
      <li><a href="#">Privacy</a></li>
    </ul>
    <ul style={{ marginLeft: "40px" }}>
      <li><a href="#">Partners</a></li>
      <li><a href="#">Business</a></li>
      <li><a href="#">Careers</a></li>
      <li><a href="#">Blog</a></li>
      <li><a href="#">FAQ</a></li>
      <li><a href="#">Creative</a></li>
    </ul>
  </div>
</div>

          </div>

          {/* Links Section */}
          <div  style={{ flex: "1", minWidth: "300px" }}>
            <div className="widget">
              <h3 style={{ fontSize: "1.8rem", marginBottom: '20px' }}>Links</h3>
              <ul className="list-unstyled links">
                <li><a href="#">Our Vision</a></li>
                <li><a href="#">About us</a></li>
                <li style={{marginBottom:"10px",}}><a href="#">Contact us</a></li>
              </ul>
              <Grid container spacing={2}>
                <Grid item>
                  <InstagramIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <TwitterIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <FacebookIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <LinkedInIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <PinterestIcon fontSize="large" />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="row mt-5" style={{ marginTop: "50px", textAlign: "center" }}>
          <div className="col-12">
            <p>
              Copyright &copy; {new Date().getFullYear()}. All Rights Reserved. &mdash; Designed with love by google
              <a href="https://untree.co" style={{ color: "white", textDecoration: "underline" }}>Untree.co</a>
            </p>
            <div>
              Distributed by DreamPropererty
              <a href="https://themewagon.com/" target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "underline" }}>themewagon</a>
            </div>
          </div>
        </div>
      </div>

      {/* Preloader */}
      <div  style={{
        position: "fixed", top: "0", left: "0", width: "100%", height: "100%", background: "rgba(0,0,0,0.7)", display: "none", zIndex: "9999"
      }}></div>
      <div  style={{ display: "none", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        {/* Your loader element here */}
      </div>
    </div>

    </>

    
  );
}

export default HomePage;

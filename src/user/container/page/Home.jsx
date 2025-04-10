import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { motion } from "framer-motion";
import { Facebook as FacebookIcon, LinkedIn as LinkedInIcon, Twitter as TwitterIcon, Pinterest as PinterestIcon, Instagram as InstagramIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

function HomePage() {
  const propertyImages = [
    "/Image/img.jpg",
    "/Image/img1.jpg",
    "/Image/img3.jpg",
    "/Image/img10.jpg",
  ];

  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const words = ["Houses", "Commercial Properties", "Apartments", "Villas"];

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); 
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const handleRegisterClick = () => {
    navigate("/register");
    setOpenMenu(false);
  };
  const handleHomeClick=()=>{
    navigate("/")
  }

  const handleDetailclick=()=>{
    navigate("/prop");
  }
const handlePropertiesClick=()=>{
  navigate("/prop")
}
  const handleViewAllClick = () => {
    navigate("/prop");
  };
  const handleServiceClick =() =>{
    navigate("/service")
  }

  return (
    <>
      {/* Hero Section */}
      <Box sx={{ maxWidth: "100%", height: "100vh", position: "relative", textAlign: "center", color: "white" }}>
        <AppBar position="absolute" sx={{ backgroundColor: "gray" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dreame Properties
            </Typography>
            <Button color="inherit" onClick={handleHomeClick}>Home</Button>
            <Button color="inherit" onClick={handlePropertiesClick} >Properties</Button>
            <Button color="inherit" onClick={handleServiceClick} >Services</Button>
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
            </Menu>
          </Toolbar>
        </AppBar>

        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${propertyImages[currentIndex]})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(8px)", zIndex: -1 }}></Box>

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
    Explore our curated selection of properties for sale and rent, including residential, commercial, and luxury options.{" "}
    <a href="#" onClick={handleViewAllClick} style={{ color: "blue", cursor: "pointer" }}>View All</a>
  </Typography>

  
  <Box
  sx={{
    display: "flex",
    gap: "20px",
    overflowX: "auto",
    padding: "20px 0",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none", 
    },
  }}
>
    {[
      { name: "Resort",img: "/Image/img1.jpg", price: "$250,000", bedrooms: "3 Bedrooms", rating: "★★★★☆" },
      {name: "House", img: "/Image/img4.jpg", price: "$340,000", bedrooms: "4 Bedrooms", rating: "★★★★★" },
      { name: "office",img: "/Image/img3.jpg", price: "$195,000", bedrooms: "2 Bedrooms", rating: "★★★☆☆" },
      { name: "Aparment",img: "/Image/img2.jpg", price: "$280,000", bedrooms: "3 Bedrooms", rating: "★★★★☆" },
    ].map((property, index) => (
      <Box
        key={index}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          minWidth: "300px",
          maxWidth: "300px",
          flexShrink: 0,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <img
          src={property.img}
          alt={`Property ${index + 1}`}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <Box sx={{ padding: "15px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#2c3e50" }}>
            {property.name}
          </Typography>

          <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#2c3e50" }}>
            {property.price}
          </Typography>
          <Typography sx={{ color: "#555", margin: "10px 0" }}>
            {property.bedrooms}
            
          </Typography>
          <Typography sx={{ color: "#f1c40f" }}>
            Rating: {property.rating}
          </Typography>
          <Button variant="contained" onClick={handleDetailclick} sx={{ marginTop: "10px", backgroundColor: "#3f51b5" }}>
            See Detail
          </Button>
        </Box>
      </Box>
    ))}
  </Box>
</Box>



      {/* Footer */}
          <div style={{ backgroundColor: "#f9f9f9", color: "black", padding: "50px 0px",marginTop:"40px"}}>
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

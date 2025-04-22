import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import Prop from "../page/Prop";

function HomePage() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const handleProfileClick = () => {
    navigate("/register");
    setOpenMenu(false);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handlePropertiesClick = () => {
    navigate("/prop");
  };

  const handleViewAllClick = () => {
    navigate("/prop");
  };

  const handleServiceClick = () => {
    navigate("/service");
  };

  const handleUpdateClick = () => {
    navigate("/updateprofile");
  };

  return (
    <>
      {/* Hero Section (No Image, No Slider) */}
      <Box
        sx={{
          maxWidth: "100%",
          height: "100vh",
          position: "relative",
          textAlign: "center",
          color: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0", // You can set a background color if needed
        }}
      >
        <AppBar position="absolute" sx={{ backgroundColor: "transparent" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Dreame Properties
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <Button color="inherit" onClick={handleHomeClick}>
                Home
              </Button>
              <Button color="inherit" onClick={handlePropertiesClick}>
                Properties
              </Button>
              <Button color="inherit" onClick={handleServiceClick}>
                Services
              </Button>
            </Box>
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
                <MenuItem onClick={handleUpdateClick}>Update</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        <Typography variant="h2" fontWeight="bold" sx={{ zIndex: 1 }}>
          Discover Your Dream Property
        </Typography>
        <Typography
          variant="h5"
          sx={{
            zIndex: 1,
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "2px",
            mt: 2,
          }}
        >
          Explore top Listings
        </Typography>
      </Box>

      {/* Property Listings Section */}
      <Box sx={{ padding: "50px", backgroundColor: "#f9f9f9" }}>
        <Typography variant="h6" textAlign="center">
          Our Listings
        </Typography>
        <Typography variant="h3" textAlign="center" fontWeight="bold" mt={2}>
          Featured <span style={{ color: "#3f51b5" }}>Properties</span>
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="textSecondary"
          mb={4}
        >
          Explore our curated selection of properties for sale and rent,{" "}
          including residential, commercial, and luxury options.{" "}
          <a
            href="#"
            onClick={handleViewAllClick}
            style={{
              color: "#3f51b5",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            View All
          </a>
        </Typography>
        <Prop />
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#f9f9f9", padding: "50px 0" }}>
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 5,
          }}
        >
          <div style={{ flex: "1", minWidth: "300px" }}>
            <h3>Contact</h3>
            <address>43 Raymouth Rd. Baltemoer, London 3910</address>
            <ul className="list-unstyled links">
              <li>
                <a href="tel://11234567890">+1(123)-456-7890</a>
              </li>
              <li>
                <a href="mailto:info@mydomain.com">info@mydomain.com</a>
              </li>
            </ul>
          </div>

          <div style={{ flex: "1", minWidth: "300px" }}>
            <h3>Quick Links</h3>
            <ul className="list-unstyled">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Terms & Privacy</a>
              </li>
            </ul>
          </div>

          <div style={{ flex: "1", minWidth: "300px" }}>
            <h3>Follow Us</h3>
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
        </Box>

        {/* Footer Bottom */}
        <Box sx={{ textAlign: "center", marginTop: "30px" }}>
          <Typography variant="body2" color="textSecondary">
            &copy; {new Date().getFullYear()} Dreame Properties. All Rights Reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default HomePage;

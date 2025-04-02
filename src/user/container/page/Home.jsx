import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function HomePage() {
  const propertyImages = [
    "/Image/img.jpg",  
    "/Image/img1.jpg", 
    "/Image/img3.jpg",  
  ];

  const words = ["Guest Rooms", "Hotels", "Resorts"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Box sx={{ maxWidth: "100%", height: "100vh", position: "relative", textAlign: "center", color: "white" }}>
        {/* Navbar */}
        <AppBar position="absolute" sx={{ opacity:"0.5", backgroundColor:"gray" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>DREAM HOUSE</Typography>
            <Button color="inherit">Home</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Room</Button>
            <Button color="inherit">Pages</Button>
            <Button color="inherit">Blog</Button>
            <Button color="inherit">Contact</Button>
          </Toolbar>
        </AppBar>

        {/* BG-img with blur BG */}
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

        {/* Contain Details */}
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <Typography variant="h3" fontWeight="bold">Find Your Peaceful Stay</Typography>
          <Typography variant="h4" fontWeight="bold">
            Your destination for {" "}
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
            Bookings
          </Typography>
          <Typography variant="body1" color="textSecondary" mt={1} sx={{ color: "white" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </Typography>
          <Button variant="contained" color="primary" startIcon={<Visibility />} sx={{ mt: 2 }}>
            Discover Now
          </Button>
        </Box>
      </Box>
      
      <Box sx={{ padding: "50px", backgroundColor: "#f9f9f9" }}>
  <Typography variant="h6" textAlign="center">Our Rooms</Typography>
  <Typography variant="h3" textAlign="center" fontWeight="bold">
    Available <span style={{ color: "#3f51b5" }}>Rooms</span>
  </Typography>
  <Typography variant="body1" textAlign="center" color="textSecondary" mb={4}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
  </Typography>



  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      backgroundColor: "#ffffff", // Background for the whole card
      borderRadius: "8px", // Optional rounded corners
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Optional shadow for card effect
      padding: "20px", // Padding inside the card
      marginBottom:"15px"
    }}
  >
    {/* Image1 Section */}
    <Box sx={{ width: "30%", padding: "10px" }}>
      <img
        src="/Image/img7.png"
        alt="Guest Room"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>

    {/* Room Details Section */}
    <Box sx={{ width: "40%", padding: "10px" }}>
      <Typography variant="h6" fontWeight="bold">Villa </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between",mt: 1 }}>
        <Typography variant="body2">2 bath</Typography>
        <Typography variant="body2">1 bed</Typography>
        <Typography variant="body2">600 sq.ft</Typography>
      </Box>
      <Typography variant="body2" color="textSecondary" mt={1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="primary">(5.0/5.0)</Typography>
      </Box>
      {/* Book Now button inside room details */}
      <Box sx={{ mt: 2, textAlign:"center" }}>
        <Button variant="contained" color="primary" fullWidth>
          Book Now
        </Button>
      </Box>
    </Box>

    {/* Price Section */}
    <Box sx={{ width: "25%", padding: "10px", textAlign: "center" }}>
      <Typography variant="h6" fontWeight="bold">$199 / VILLA</Typography>
    </Box>
  </Box>

  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      backgroundColor: "#ffffff", // Background for the whole card
      borderRadius: "8px", // Optional rounded corners
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Optional shadow for card effect
      padding: "20px", // Padding inside the card
      marginBottom:"15px"
    }}
  >
    {/* Image2 Section */}
    <Box sx={{ width: "30%", padding: "10px" }}>
      <img
        src="/Image/img8.png"
        alt=" Room"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>

    {/* Room Details Section */}
    <Box sx={{ width: "40%", padding: "10px" }}>
      <Typography variant="h6" fontWeight="bold">SEA Resort </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between",mt: 1 }}>
        <Typography variant="body2">4 bath</Typography>
        <Typography variant="body2">2 bed</Typography>
        <Typography variant="body2">1000 sq.ft</Typography>
      </Box>
      <Typography variant="body2" color="textSecondary" mt={1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="primary">(5.0/5.0)</Typography>
      </Box>
      {/* Book Now button inside room details */}
      <Box sx={{ mt: 2, textAlign:"center" }}>
        <Button variant="contained" color="primary" fullWidth>
          Book Now
        </Button>
      </Box>
    </Box>

    {/* Price Section */}
    <Box sx={{ width: "25%", padding: "10px", textAlign: "center" }}>
      <Typography variant="h6" fontWeight="bold">$999 /SEA RESORT</Typography>
    </Box>
  </Box>

  <Box
    sx={{
      display: "flex",
      marginBottom:"15px",
      justifyContent: "space-between",
      flexWrap: "wrap",
      backgroundColor: "#ffffff", // Background for the whole card
      borderRadius: "8px", // Optional rounded corners
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Optional shadow for card effect
      padding: "20px", // Padding inside the card
      
    }}
  >
    {/* Image3 Section */}
    <Box sx={{ width: "30%", padding: "10px" }}>
      <img
        src="/Image/img.jpg"
        alt="Guest Room"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>

    {/* Room Details Section */}
    <Box sx={{ width: "40%", padding: "10px" }}>
      <Typography variant="h6" fontWeight="bold">Hotel </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between",mt: 1 }}>
        <Typography variant="body2">2 bath</Typography>
        <Typography variant="body2">1 bed</Typography>
        <Typography variant="body2">400 sq.ft</Typography>
      </Box>
      <Typography variant="body2" color="textSecondary" mt={1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="primary">(5.0/5.0)</Typography>
      </Box>
      {/* Book Now button inside room details */}
      <Box sx={{ mt: 2, textAlign:"center" }}>
        <Button variant="contained" color="primary" fullWidth>
          Book Now
        </Button>
      </Box>
    </Box>

    {/* Price Section */}
    <Box sx={{ width: "25%", padding: "10px", textAlign: "center" }}>
      <Typography variant="h6" fontWeight="bold">$199 / HOTEL</Typography>
    </Box>
  </Box>


  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      backgroundColor: "#ffffff", // Background for the whole card
      borderRadius: "8px", // Optional rounded corners
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Optional shadow for card effect
      padding: "20px", // Padding inside the card
      marginBottom:"15px"
    }}
  >
    {/* Image4 Section */}
    <Box sx={{ width: "30%", padding: "10px" }}>
      <img
        src="/Image/img7.png"
        alt="Guest Room"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>

    {/* Room Details Section */}
    <Box sx={{ width: "40%", padding: "10px" }}>
      <Typography variant="h6" fontWeight="bold">Villa</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between",mt: 1 }}>
        <Typography variant="body2">2 bath</Typography>
        <Typography variant="body2">1 bed</Typography>
        <Typography variant="body2">600 sq.ft</Typography>
      </Box>
      <Typography variant="body2" color="textSecondary" mt={1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="primary">(5.0/5.0)</Typography>
      </Box>
      {/* Book Now button inside room details */}
      <Box sx={{ mt: 2, textAlign:"center" }}>
        <Button variant="contained" color="primary" fullWidth>
          Book Now
        </Button>
      </Box>
    </Box>

    {/* Price Section */}
    <Box sx={{ width: "25%", padding: "10px", textAlign: "center" }}>
      <Typography variant="h6" fontWeight="bold">$500 / VILLA</Typography>
    </Box>
  </Box>



</Box>




    </>
  );
}

export default HomePage;

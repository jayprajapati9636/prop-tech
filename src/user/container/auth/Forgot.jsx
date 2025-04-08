import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper, Link } from "@mui/material";
import axios from "axios"; // Ensure axios is installed

const Forgot = () => {
  const [mobileNumber, setMobileNumber] = useState("");  // Changed to mobile number
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Regular expression to validate mobile number (e.g., 10 digits)
    const mobileNumberPattern = /^\d{10}$/;

    if (!mobileNumberPattern.test(mobileNumber)) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      // Make an API request to send OTP to mobile number
      const response = await axios.post("/api/send-otp", { mobileNumber });
      if (response.data.success) {
        setOtpSent(true);
        setMessage("OTP sent to your mobile. Please check your messages.");
      } else {
        setMessage(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      setMessage("Error sending OTP. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('https://cdn.pixabay.com/photo/2023/12/19/22/46/house-8458547_1280.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: 350, textAlign: "center", bgcolor: "rgba(255, 255, 255, 0.8)" }}>
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter your Mobile Number"
            margin="normal"
            variant="outlined"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
            inputProps={{
              maxLength: 10, // Optionally limit the input length to 10 digits
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Send OTP
          </Button>
        </form>

        {message && (
          <Typography variant="body2" sx={{ mt: 2, color: otpSent ? "green" : "red" }}>
            {message}
          </Typography>
        )}

        {otpSent && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            <Link href="/verify-otp">Go to OTP Verification</Link>
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Forgot;

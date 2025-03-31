import React from "react";
import { TextField, Button, Typography, Box, Paper, Link } from "@mui/material";

const Login = () => {
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
          Real Estate Login
        </Typography>
        <TextField fullWidth label="Email" margin="normal" variant="outlined" />
        <TextField fullWidth label="Password" type="password" margin="normal" variant="outlined" />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          <Link href="/forgot-password">Forgot Password?</Link>
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Are you new? <Link href="/register">Register now</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;

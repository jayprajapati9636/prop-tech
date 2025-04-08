import React from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const signUpSchema = Yup.object({
  Name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed")
    .required("Full Name is required"),

  Mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .max(10)
    .required("Mobile number is required"),

  Address: Yup.string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters long"),  
});

const initialValues = {
  Name: "",
  Mobile: "",
  Address: "", 
};

const Register = () => {
  const navigate = useNavigate();  

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log("Registered User:", values);
      
      alert("Update Successful!");
      
      
      navigate("/homepage");  
    },
  });

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
          Update Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            variant="outlined"
            value={values.Name}
            name="Name"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.Name && Boolean(errors.Name)}
            helperText={touched.Name && errors.Name}
          />

          {/* Mobile Number */}
          <TextField
            fullWidth
            label="Mobile Number"
            margin="normal"
            variant="outlined"
            value={values.Mobile}
            name="Mobile"
            inputProps={{
              maxLength: 10,
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.Mobile && Boolean(errors.Mobile)}
            helperText={touched.Mobile && errors.Mobile}
          />

          {/* Address */}
          <TextField
            fullWidth
            label="Address"
            margin="normal"
            variant="outlined"
            value={values.Address}
            name="Address"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.Address && Boolean(errors.Address)}
            helperText={touched.Address && errors.Address}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Udate
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;

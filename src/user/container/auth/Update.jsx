import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Validation schema
const profileSchema = Yup.object({
  Name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed")
    .required("Full Name is required"),
  Email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  Password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/[0-9]/, "At least one number")
    .matches(/[!@#$%^&*]/, "At least one special character")
    .required("Password is required"),
});

const initialValues = {
  Name: "",
  Email: "",
  Password: "",
};

const UpdateProfile = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setSubmitting,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: profileSchema,
    onSubmit: async (values) => {
        const payload = {
          name: values.Name,
          email: values.Email,
          password: values.Password,
        };
      
        try {
          const token = localStorage.getItem("token"); // adjust this if needed
      
          const response = await axios.post(
            "http://localhost:5001/api/user/profile/update",
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Profile Updated:", response.data);
          resetForm();
        } catch (error) {
          console.error("Update Error:", error.response?.data || error.message);
        } finally {
          setSubmitting(false);
        }
      },
      
  });

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2023/12/19/22/46/house-8458547_1280.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          width: 400,
          maxWidth: "90%",
          textAlign: "center",
          bgcolor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Update Profile
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          Edit your details below
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            name="Name"
            variant="outlined"
            value={values.Name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.Name && Boolean(errors.Name)}
            helperText={touched.Name && errors.Name}
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            name="Email"
            variant="outlined"
            value={values.Email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.Email && Boolean(errors.Email)}
            helperText={touched.Email && errors.Email}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="New Password"
            margin="normal"
            name="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={values.Password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.Password && Boolean(errors.Password)}
            helperText={touched.Password && errors.Password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.2, fontWeight: "bold" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default UpdateProfile;

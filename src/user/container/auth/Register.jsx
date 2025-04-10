import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Validation schema
const signUpSchema = Yup.object({
  Name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed")
    .required("Full Name is required"),
  Email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  Password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must have at least one uppercase letter")
    .matches(/[0-9]/, "Password must have at least one number")
    .matches(/[!@#$%^&*]/, "Password must have at least one special character")
    .required("Password is required"),
 
  

});

const initialValues = {
  Name: "",
  Email: "",
  Password: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    resetForm,
    setSubmitting
  } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values) => {

      console.log(values , ":values")

      const payload = {
        name: values?.Name,
        email: values?.Email,
        password: values?.Password,
      }



      try {
        const response = await axios.post("http://192.168.1.50:5001/api/user/register", payload);
        console.log("Server Response:", response.data);

        resetForm();
        navigate("/login");
      } catch (error) {
        console.error("Registration Error:", error.response?.data || error.message);
        
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
      }}
    >
      <Paper
        elevation={6}
        sx={{ p: 4, width: 350, textAlign: "center", bgcolor: "rgba(255, 255, 255, 0.8)" }}
      >
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            variant="outlined"
            name="Name"
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
            variant="outlined"
            name="Email"
            value={values.Email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.Email && Boolean(errors.Email)}
            helperText={touched.Email && errors.Email}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            variant="outlined"
            name="Password"
            value={values.Password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.Password && Boolean(errors.Password)}
            helperText={touched.Password && errors.Password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
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
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link href="/login">Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;

import React from "react";
import { Container, TextField, Button, Typography, Box, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

// Validation Schema
const signUpSchema = Yup.object({
  Name: Yup.string().required("Full Name is required"),
  Email: Yup.string().email("Invalid email").required("Email is required"),
  Password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  Confirm_Password: Yup.string()
    .oneOf([Yup.ref("Password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});


const initialValues = {
  Name: "",
  Email: "",
  Password: "",
  Confirm_Password: "",
};

const Register = () => {
  const navigate = useNavigate();

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log(values);
      navigate("/login"); 
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
          Real Estate Register
        </Typography>
        <form onSubmit={handleSubmit}>
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
          
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            value={values.Email}
            name="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.Email && Boolean(errors.Email)}
            helperText={touched.Email && errors.Email}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            value={values.Password}
            name="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.Password && Boolean(errors.Password)}
            helperText={touched.Password && errors.Password}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            margin="normal"
            variant="outlined"
            value={values.Confirm_Password}
            name="Confirm_Password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.Confirm_Password && Boolean(errors.Confirm_Password)}
            helperText={touched.Confirm_Password && errors.Confirm_Password}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Register
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

import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import roboImage from "../assets/robogif.gif";

const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username, email, password } = formData;

      if (!username || !email || !password) {
        toast.error("Please fill up all the fields to register");
        return;
      }
      if (username.length < 2) {
        toast.error("Username must be at least 2 characters long");
        return;
      }

      if (username.length > 15) {
        toast.error("Username must be at most 15 characters long");
        return;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
      if (password.length > 12) {
        toast.error("Password must be lesser than 13 characters");
        return;
      }

      const response = await axios.post("/api/v1/auth/register", formData);
      console.log("Registration successful", response.data);
      toast.success("Registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.error) {
        // Handle backend validation errors
        toast.error(error.response.data.error);
      } else {
        // Handle server errors
        toast.error("Registration Failed");
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Toaster />
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            mt: 5,
          }}
        >
          {/* Image Section */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: isMobile ? 3 : 0,
            }}
          >
            <img
              src={roboImage}
              alt="Register"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "500px",
                borderRadius: "15px",
              }}
            />
          </Box>

          {/* Form Section */}
          <Box
            sx={{
              flex: 1,
              ml: isMobile ? 0 : 5,
              width: isMobile ? "100%" : "auto",
            }}
          >
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Register
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Button type="submit" variant="contained" color="primary">
                  Register
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;

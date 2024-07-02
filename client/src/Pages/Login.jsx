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
  Tooltip,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff, ContentCopy } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all fields to login");
      return;
    }

    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      console.log(data);
      if (data.token.authToken) {
        toast.success("Login successful");
        localStorage.setItem("authToken", data.token.authToken);
        navigate("/dashboard");
      } else {
        toast.error("Invalid login response");
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Login Failed");
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <Container maxWidth={isMobile ? "xs" : "sm"}>
      <Toaster />
      <Box
        sx={{
          mt: 5,
          px: isMobile ? 2 : 3,
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
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
          <Paper sx={{ mt: 4, p: 2, textAlign: "center" }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Demo Credentials
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="body1">Email: testing1@gmail.com</Typography>
              <Tooltip title="Copy Email">
                <IconButton onClick={() => handleCopy("testing1@gmail.com")}>
                  <ContentCopy />
                </IconButton>
              </Tooltip>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">Password: testing123</Typography>
              <Tooltip title="Copy Password">
                <IconButton onClick={() => handleCopy("testing123")}>
                  <ContentCopy />
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;

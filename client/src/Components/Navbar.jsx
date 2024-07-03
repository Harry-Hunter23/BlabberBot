import React, { useCallback } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_URL;

// Define the horizontal and vertical bouncing animation
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translate(0, 0);
  }
  40% {
    transform: translate(-10px, -20px);
  }
  60% {
    transform: translate(10px, -10px);
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const loggedin = !!localStorage.getItem("authToken"); // Check if authToken exists

  const handleLogout = useCallback(async () => {
    try {
      await axios.post(`${apiUrl}/api/v1/auth/logout`);
      localStorage.removeItem("authToken");
      toast.success("Logged out Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }, [navigate]);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#3f51b5", height: "100px" }}
    >
      <Toaster />
      <Toolbar
        sx={{ flexDirection: "column", alignItems: "center", height: "100%" }}
      >
        <Typography
          variant="h4"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontSize: "2rem",
            animation: `${bounce} 2s infinite`, // Apply the bouncing animation
            marginTop: "20px", // Add margin from the top
          }}
        >
          BlabberBot
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {loggedin ? (
            <Button
              color="inherit"
              sx={{
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "yellow",
                },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                color="inherit"
                sx={{
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "yellow",
                  },
                }}
                component={RouterLink}
                to="/login"
              >
                Login
              </Button>
              <Button
                color="inherit"
                sx={{
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "yellow",
                  },
                }}
                component={RouterLink}
                to="/register"
              >
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Navbar);

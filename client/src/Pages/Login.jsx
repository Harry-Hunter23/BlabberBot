import React, { useReducer, useCallback } from "react";
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

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  email: "",
  password: "",
  showPassword: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    default:
      return state;
  }
}

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = useCallback((e) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;

    if (!email || !password) {
      toast.error("Please fill in all fields to login");
      return;
    }

    try {
      const { data } = await axios.post(`${apiUrl}/api/v1/auth/login`, {
        email,
        password,
      });
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
    dispatch({ type: "TOGGLE_PASSWORD" });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <Container maxWidth={isMobile ? "xs" : "sm"}>
      <Toaster />
      <Box sx={{ mt: 5, px: isMobile ? 2 : 3 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={state.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={state.showPassword ? "text" : "password"}
            value={state.password}
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
                    {state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Paper
            elevation={3}
            sx={{
              mt: 4,
              p: 2,
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "10px",
            }}
          >
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
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "black" }}
              >
                Email: testing1@gmail.com
              </Typography>
              <Tooltip title="Copy Email">
                <IconButton onClick={() => handleCopy("testing1@gmail.com")}>
                  <ContentCopy sx={{ color: "#3f51b5" }} />
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
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "black" }}
              >
                Password: testing123
              </Typography>
              <Tooltip title="Copy Password">
                <IconButton onClick={() => handleCopy("testing123")}>
                  <ContentCopy sx={{ color: "#3f51b5" }} />
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

export default React.memo(Login);

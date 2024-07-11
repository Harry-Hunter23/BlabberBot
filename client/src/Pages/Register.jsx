import React, {
  useState,
  useCallback,
  useReducer,
  lazy,
  Suspense,
} from "react";
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
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, HourglassEmpty } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import roboImage from "../assets/robogif.gif";

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  username: "",
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

const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = state;

    if (!username || !email || !password) {
      toast.error("Please fill up all the fields to register");
      return;
    }
    if (username.length < 2 || username.length > 15) {
      toast.error("Username must be between 2 and 15 characters long");
      return;
    }
    if (password.length < 6 || password.length > 12) {
      toast.error("Password must be between 6 and 12 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/api/v1/auth/register`, {
        username,
        email,
        password,
      });
      console.log("Registration successful", response.data);
      toast.success("Registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Registration Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    dispatch({ type: "TOGGLE_PASSWORD" });
  };

  return (
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
          {loading && (
            <Box
              sx={{
                width: "100%",
                mb: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <CircularProgress />
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HourglassEmpty
                  sx={{
                    mr: 1,
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography variant="body2">
                  Render may delay initial requests for up to 50 seconds due to
                  the free instance, so please wait.
                </Typography>
              </Box>
            </Box>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={state.username}
              onChange={handleChange}
              margin="normal"
            />
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

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                Register
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default React.memo(Register);

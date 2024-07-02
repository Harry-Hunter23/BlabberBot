import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button as MUIButton, Box } from "@mui/material";
import { keyframes } from "@emotion/react";

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const CustomButton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 4, // Spacing above the button
        textAlign: "center",
      }}
    >
      <Typography variant="body1" gutterBottom>
        Not this tool
      </Typography>
      <Link to="/" style={{ textDecoration: "none", marginLeft: 8 }}>
        <MUIButton
          variant="contained"
          color="primary"
          sx={{
            animation: `${bounce} 2s infinite`,
          }}
        >
          Go Back & Try a Different Tool
        </MUIButton>
      </Link>
    </Box>
  );
};

export default CustomButton;

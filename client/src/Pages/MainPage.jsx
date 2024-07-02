import React from "react";
import {
  Typography,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Summarize, Create, EmojiPeople, Image } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import space from "../assets/space.mp4";

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

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        }}
      >
        <source src={space} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Container
        sx={{
          position: "relative",
          zIndex: 1,
          color: "white",
          textAlign: "center",
          padding: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            ...(isMobile && { p: 2 }),
          }}
        >
          <Typography
            variant={isMobile ? "h4" : "h2"}
            component="h1"
            gutterBottom
          >
            Welcome to my application
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            component="p"
            gutterBottom
          >
            Sign up and then login to use the functionalities
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              component="h2"
              gutterBottom
            >
              Available Tools:
            </Typography>
            <List>
              {[
                {
                  text: "Text Summarizer",
                  icon: <Summarize fontSize="large" color="primary" />,
                },
                {
                  text: "Paragraph Generator",
                  icon: <Create fontSize="large" color="secondary" />,
                },
                {
                  text: "Shrihari-Bot 🤖",
                  icon: (
                    <EmojiPeople fontSize="large" sx={{ color: "#FF5722" }} />
                  ),
                },
                {
                  text: "Sci-Fi Image Generator",
                  icon: <Image fontSize="large" color="action" />,
                },
              ].map((tool, index) => (
                <ListItem
                  key={tool.text}
                  sx={{
                    animation: `${bounce} 2s infinite`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  <ListItemIcon>{tool.icon}</ListItemIcon>
                  <ListItemText
                    primary={tool.text}
                    sx={{ fontSize: isMobile ? "1rem" : "1.2rem" }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Typography
            variant={isMobile ? "body2" : "h6"}
            component="p"
            gutterBottom
          >
            Contact: deshmukhshrihari46@gmail.com
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import summaryrobo from "../assets/summarygif.gif";
import bot from "../assets/bot.gif";
import travis from "../assets/travis.gif";
import para from "../assets/paragraph.gif";

const cardItems = [
  {
    image: summaryrobo,
    alt: "Summary Image",
    title: "Summarize the Text up to 500 words",
    description: "Click the button below to start summarizing your content.",
    link: "/summary",
    buttonText: "Summarize",
  },
  {
    image: para,
    alt: "Paragraph Image",
    title: "Generate a Paragraph from Words",
    description: "Click the button below to generate the Paragraph.",
    link: "/paragraph",
    buttonText: "Generate the Paragraph",
  },
  {
    image: bot,
    alt: "Chatbot Image",
    title: "ShrihariBot",
    description: "Click the button below to chat with Shrihari's Bot.",
    link: "/chatbot",
    buttonText: "Chat with Shrihari's Bot",
  },
  {
    image: travis,
    alt: "SciFi Image",
    title: "Generate a Sci-Fi Image from Text",
    description: "Click the button below to generate a Sci-Fi image.",
    link: "/image",
    buttonText: "Generate a Sci-Fi Image",
  },
];

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const cards = useMemo(
    () =>
      cardItems.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card sx={{ textAlign: "center" }}>
            <CardMedia
              component="img"
              height="200"
              image={item.image}
              alt={item.alt}
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {item.description}
              </Typography>
              <Link to={item.link} style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary">
                  {item.buttonText}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      )),
    []
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {cards}
      </Grid>
    </Box>
  );
};

export default React.memo(Dashboard);

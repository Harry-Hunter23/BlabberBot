import React from "react";
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

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ textAlign: "center" }}>
            <CardMedia
              component="img"
              height="200"
              image={summaryrobo}
              alt="Summary Image"
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Summarize the Text up to 500 words
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Click the button below to start summarizing your content.
              </Typography>
              <Link to="/summary" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary">
                  Summarize
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ textAlign: "center" }}>
            <CardMedia
              component="img"
              height="200"
              image={para}
              alt="Paragraph Image"
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Generate a Paragraph from Words
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Click the button below to generate the Paragraph.
              </Typography>
              <Link to="/paragraph" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary">
                  Generate the Paragraph
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ textAlign: "center" }}>
            <CardMedia
              component="img"
              height="200"
              image={bot}
              alt="Chatbot Image"
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                ShrihariBot
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Click the button below to chat with Shrihari's Bot.
              </Typography>
              <Link to="/chatbot" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary">
                  Chat with Shrihari's Bot
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ textAlign: "center" }}>
            <CardMedia
              component="img"
              height="200"
              image={travis}
              alt="SciFi Image"
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Generate a Sci-Fi Image from Text
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Click the button below to generate a Sci-Fi image.
              </Typography>
              <Link to="/image" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary">
                  Generate a Sci-Fi Image
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

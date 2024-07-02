import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import CustomButton from "../Components/Button";
const apiUrl = import.meta.env.VITE_API_URL;

const GenerateSciFiImage = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast.error("Prompt cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/v1/openai/image`, {
        prompt,
      });
      setImageUrl(response.data.imageUrl);
      toast.success("Image generated successfully!");
    } catch (error) {
      console.error("Error generating image", error);
      toast.error("Error generating image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
        <Toaster />
        <Paper elevation={3} sx={{ p: 4, position: "relative" }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Generate Sci-Fi Image
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Enter prompt for Sci-Fi image"
              fullWidth
              variant="outlined"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleGenerateImage}
            >
              Generate Image
            </Button>
          </Box>
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
          {imageUrl && (
            <Box mt={4} display="flex" justifyContent="center">
              <img
                src={imageUrl}
                alt="Generated Sci-Fi"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
          )}
        </Paper>
      </Container>
      <CustomButton />
    </>
  );
};

export default GenerateSciFiImage;

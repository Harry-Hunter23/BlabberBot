import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  LinearProgress,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_URL;

const Summarizer = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/v1/openai/summary`, {
        text,
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error summarizing text", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(summary)
      .then(() => {
        toast.success("Summary copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy the text:", error);
        toast.error("Failed to copy the text.");
      });
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Toaster />
      <Paper elevation={3} sx={{ p: 4, position: "relative" }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Text Summarizer
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Enter text to summarize"
            multiline
            rows={10}
            fullWidth
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSummarize}
          >
            Summarize
          </Button>
        </Box>
        {loading && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <LinearProgress />
          </Box>
        )}
        {summary && (
          <Box mt={4}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexDirection={isMobile ? "column" : "row"}
            >
              <Typography variant="h6" gutterBottom={isMobile}>
                Summary:
              </Typography>
              <Tooltip title="Copy to clipboard">
                <IconButton onClick={handleCopy}>
                  <ContentCopy />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="body1">{summary}</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Summarizer;

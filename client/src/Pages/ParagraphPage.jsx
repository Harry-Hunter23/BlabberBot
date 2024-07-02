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
import CustomButton from "../Components/Button";

const ParagraphGenerator = () => {
  const [text, setText] = useState("");
  const [para, setPara] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleParagen = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/openai/paragraph", { text });
      setPara(response.data.paragraph);
      toast.success("Paragraph generated successfully!");
    } catch (error) {
      console.error("Error generating paragraph", error);
      toast.error("Error generating paragraph.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(para)
      .then(() => {
        toast.success("Paragraph copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy the text:", error);
        toast.error("Failed to copy the text.");
      });
  };

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
        <Toaster />
        <Paper elevation={3} sx={{ p: 4, position: "relative" }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Paragraph Generator
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Enter text to generate the paragraph"
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
              onClick={handleParagen}
            >
              Generate Paragraph
            </Button>
          </Box>
          {loading && (
            <Box sx={{ width: "100%", mt: 2 }}>
              <LinearProgress />
            </Box>
          )}
          {para && (
            <Box mt={4}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexDirection={isMobile ? "column" : "row"}
              >
                <Typography variant="h6" gutterBottom={isMobile}>
                  Paragraph:
                </Typography>
                <Tooltip title="Copy to clipboard">
                  <IconButton onClick={handleCopy}>
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                {para}
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
      <CustomButton />
    </>
  );
};

export default ParagraphGenerator;

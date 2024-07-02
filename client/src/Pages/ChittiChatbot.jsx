import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  LinearProgress,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import CustomButton from "../Components/Button";

const ChittiChatbot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    const userMessage = {
      sender: "user",
      text: `Me: ${message}`,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessage("");

    setLoading(true);
    try {
      const response = await axios.post("/api/v1/openai/chatbot", { message });
      const botMessage = {
        sender: "chitti",
        text: `ShrihariBot replied: ${response.data.response}`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      toast.success("ShrihariBot replied!");
    } catch (error) {
      console.error("Error generating response", error);
      toast.error("Error generating response.");
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
            Chat with ShrihariBot
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "60vh",
              overflowY: "auto",
              mb: 2,
              p: 1,
              backgroundColor: "#f0f0f0",
              borderRadius: 2,
            }}
          >
            <List sx={{ width: "100%" }}>
              {messages.map((msg, index) => (
                <ListItem
                  key={index}
                  sx={{
                    justifyContent:
                      msg.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "70%",
                      p: 2,
                      borderRadius: 2,
                      backgroundColor:
                        msg.sender === "user" ? "#dcf8c6" : "#fff",
                      boxShadow: 1,
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "bold", color: "black" }}
                        >
                          {msg.text}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {msg.timestamp}
                        </Typography>
                      }
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
            {loading && (
              <Box sx={{ width: "100%", mt: 2 }}>
                <LinearProgress />
              </Box>
            )}
          </Box>
          <Box display="flex" alignItems="center">
            <TextField
              label="Type a message"
              fullWidth
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              sx={{ mr: 1 }}
            />
            <Tooltip title="Send">
              <IconButton color="primary" onClick={handleSendMessage}>
                <Send />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
      </Container>
      <CustomButton />
    </>
  );
};

export default ChittiChatbot;

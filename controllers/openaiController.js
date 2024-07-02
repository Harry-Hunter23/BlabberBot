const axios = require("axios");
require("dotenv").config();

const summarizeText = async (req, res) => {
  const { text } = req.body;

  console.log("Request body:", req.body); // Log the request body

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: `Please summarize the following text:\n\n${text}`,
          },
        ],
        max_tokens: 500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const summary = response.data.choices[0].message.content.trim();
    res.status(200).json({ summary });
  } catch (error) {
    console.error(
      "Error summarizing text:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: "Error summarizing text",
      details: error.response ? error.response.data : error.message,
    });
  }
};

const generateParagraph = async (req, res) => {
  const { text } = req.body;

  console.log("Request body:", req.body); // Log the request body

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a creative assistant." },
          {
            role: "user",
            content: `Please generate a detailed paragraph based on the following text:\n\n${text}`,
          },
        ],
        max_tokens: 200,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const paragraph = response.data.choices[0].message.content.trim();
    res.status(200).json({ paragraph });
  } catch (error) {
    console.error(
      "Error generating paragraph:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: "Error generating paragraph",
      details: error.response ? error.response.data : error.message,
    });
  }
};

const chatWithChitti = async (req, res) => {
  const { message } = req.body;

  console.log("Request body:", req.body); // Log the request body

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `${process.env.important}`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const chittiResponse = response.data.choices[0].message.content.trim();
    res.status(200).json({ response: chittiResponse });
  } catch (error) {
    console.error(
      "Error chatting with Chitti:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: "Error chatting with Chitti",
      details: error.response ? error.response.data : error.message,
    });
  }
};

const generateSciFiImage = async (req, res) => {
  const { prompt } = req.body;

  console.log("Request body:", req.body); // Log the request body

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: `Sci-Fi: ${prompt}`,
        n: 1, // Number of images to generate
        size: "1024x1024", // Size of the generated image
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const imageUrl = response.data.data[0].url;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error(
      "Error generating image:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: "Error generating image",
      details: error.response ? error.response.data : error.message,
    });
  }
};

module.exports = {
  summarizeText,
  generateParagraph,
  generateSciFiImage,
  chatWithChitti,
};

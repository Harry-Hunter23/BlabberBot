const axios = require("axios");
require("dotenv").config();

const makeRequest = async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Hello" }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      res
        .status(429)
        .json({ error: "Quota exhausted", details: error.response.data });
    } else {
      res.status(500).json({
        error: "An error occurred",
        details: error.response ? error.response.data : error.message,
      });
    }
  }
};

module.exports = { makeRequest };

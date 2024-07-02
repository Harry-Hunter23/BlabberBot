const express = require("express");
const {
  summarizeText,
  generateParagraph,
  generateSciFiImage,
  chatWithChitti,
} = require("../controllers/openaiController");
const router = express.Router();

router.post("/summary", summarizeText);
router.post("/paragraph", generateParagraph);
router.post("/chatbot", chatWithChitti);
router.post("/image", generateSciFiImage);

module.exports = router;

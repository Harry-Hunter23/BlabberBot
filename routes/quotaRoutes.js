const express = require("express");
const router = express.Router();
const { makeRequest } = require("../controllers/apiController");

router.post("/api/v1/make-request", makeRequest);

module.exports = router;

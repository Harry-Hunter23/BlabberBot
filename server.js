require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./Database/DbConnect");
const authRouter = require("./routes/authRoutes");
const openaiRouter = require("./routes/openaiRoutes");
const errorHandler = require("./Middlewares/errorHandlerMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());

// Connect to the database
connectDB();

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "This is the Health API and it is functioning properly",
  });
});

// API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/openai", openaiRouter);

// Error handling middleware (should be last)
app.use(errorHandler);
// Using Node.js Buffer directly

// Handle the buffer as needed

// Running the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.DEV_MODE} mode`);
});

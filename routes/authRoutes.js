const express = require("express");
const {
  loginController,
  logoutController,
  registerController,
} = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/register", registerController);

authRouter.post("/login", loginController);

authRouter.post("/logout", logoutController);

module.exports = authRouter;

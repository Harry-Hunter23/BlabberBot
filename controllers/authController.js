const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res); // Call getSignedToken on the user instance
  res.status(statusCode).json({
    success: true,
    token,
  });
};

exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill up all the fields to Use BlabberBot",
        success: false,
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // return res.status(400).json({
      //   message: "The User already Exists with this email,Please Login",
      //   success: "false",
      return next(new ErrorResponse(`The Email is already registered`, 500));
      // });
    }

    const user = await User.create({ username, email, password });
    this.sendToken(user, 201, res);
    return next(new ErrorResponse(`User successfully Registered`, 201));
    // return res.status(200).json({
    //   message: "The User has successfully registered-authcontroller",
    //   success: true,
    // });
  } catch (error) {
    console.log(error);
    next(error);
    // res.status(500).json({ message: "Internal server error", success: false });
  }
};

exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse("Please provide email and password", 400));
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid email", 401));
    }

    // Verify password
    const isMatch = await user.comparePassword(password); // Call comparePassword on the user instance
    if (!isMatch) {
      return next(new ErrorResponse("Invalid password", 401));
    }

    // Send token if credentials are valid

    const token = user.getSignedToken(res); // Assuming this sets the cookie and returns the access token
    res.status(200).json({ success: true, token: { authToken: token } });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Login Failed", 500));
  }
};

exports.logoutController = (req, res, next) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

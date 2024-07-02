const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookie = require("cookie");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      validate: {
        validator: function (v) {
          return (
            validator.isAlpha(v.replace(/\s/g, "")) &&
            v.length >= 2 &&
            v.length <= 30
          );
        },
        message: (props) =>
          `${props.value} is not a valid name.username cant have symbols and numerics`,
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [100, "Password must be at most 100 characters long"],
    },
    customerId: {
      type: String,
      default: "",
    },
    subscription: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Compare the password
userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password);
};

// Sign token and set cookie
userSchema.methods.getSignedToken = function (res) {
  const accessToken = jwt.sign(
    { id: this._id },
    process.env.JWT_access_SECRET,
    {
      expiresIn: process.env.JWT_access_EXPIREIN,
    }
  );
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.JWT_refresh_TOKEN,
    { expiresIn: process.env.JWT_refresh_EXPIREIN }
  );

  res.cookie("refreshToken", refreshToken, {
    maxAge: 86400 * 7000,
    httpOnly: true,
  });

  return accessToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

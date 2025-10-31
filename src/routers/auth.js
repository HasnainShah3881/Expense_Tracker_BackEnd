const express = require("express");
const Authrouter = express.Router();
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { upload } = require("../config/multer");
const { User } = require("../models/userSchema");
require("dotenv").config();

Authrouter.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.json({
      success: true,
      imageUrl: req.file.path, 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


Authrouter.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password ,profilePicture } = req.body;

    if (!fullName) {
      return res
        .status(400)
        .json({ success: false, message: "Full name is required." });
    }

    if (!email || !validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or missing email address." });
    }

    if (!password || !validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password is not strong enough. Include uppercase, lowercase, numbers, and symbols.",
      });
    }
    if (!profilePicture) {
      return res
        .status(400)
        .json({ success: false, message: "Profile picture is required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: "false", message: "Email already in use." });
    }

    const passwordhashed = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: passwordhashed,
      profilePicture,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send("Something went wrong. Please try again later.");
  }
});

Authrouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .json({ success: false, message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res
        .json({ success: false, message: "User not found. Please sign up first." });
    }
    const ispasswordvalid = await bcrypt.compare(password, user.password);
    if (!ispasswordvalid) {
      return res.json({ success: false, message: "invalid password" });
    }
    const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), 
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstname,
        lastName: user.lastname,
        bio: user.bio
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in: " + error.message });
  }
});
Authrouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      expires: new Date(Date.now() * 0), 
    });

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
});

module.exports = Authrouter;

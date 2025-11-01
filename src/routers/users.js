const express = require("express");
const { userAuth } = require("../middleware/auth");
const Usersrouter = express.Router();
const { User } = require("../models/userSchema");
const mongoose = require("mongoose");


Usersrouter.get("/getUser", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    res.status(200).json({
      fullName:user.fullName,
      email: user.email,
      _id: user._id,
      pic:user.profilePicture
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error fetching user." });
  }
});








module.exports = Usersrouter;


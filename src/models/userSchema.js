const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
  
    },
    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please enter a strong password");
        }
      },
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      minLength: 10,
      maxLength: 300,
      default: "No bio provided.",
    },
  },
  { collection: "Users" }
);

const User = mongoose.model("User", UserSchema);
module.exports = { User };

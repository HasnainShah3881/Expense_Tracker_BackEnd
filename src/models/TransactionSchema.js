const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  icon: {
    type: String, // e.g. "💸" or icon name like "shopping-cart"
    required: true, 
  },
  source: {
    type: String, // e.g. "Salary", "Food", "Rent", "Freelance"
    required: true,
  },
  name: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);

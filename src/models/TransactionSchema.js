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
    type: String, 
    required: true, 
  },
  source: {
    type: String, 
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

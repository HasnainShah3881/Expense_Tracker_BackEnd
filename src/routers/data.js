const express = require("express");
const Datarouter = express.Router();

const { Transaction } = require("../models/TransactionSchema");
const { userAuth } = require("../middleware/auth"); 
const TransactionSchema = require("../models/TransactionSchema");


Datarouter.get("/getAlldata", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const alldata = await TransactionSchema.find({ email: user.email }).sort({ createdAt: -1 });
    res.status(200).json(alldata);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});




Datarouter.post("/addData", async (req, res) => {
  try {
    const { amount, date, icon, source, name, email } = req.body;

    // Required field validation
    if (!amount || !icon || !source || !name || !email) {
      return res.status(400).json({
        success: false,
        message: "Amount, icon, source, name, and email are required.",
      });
    }

    // Create new transaction
    const newTransaction = new TransactionSchema({
      amount,
      date,
      icon,
      source,
      name,
      email,
    });

    await newTransaction.save();

    res.status(201).json({
      success: true,
      message: "Transaction added successfully.",
      data: newTransaction,
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

module.exports = Datarouter;

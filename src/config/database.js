const mongoose = require("mongoose");
require("dotenv").config();

function connectDB() {
  return mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hteb05l.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )
    .then(() => console.log(`Connected to MongoDB Database: ${process.env.DB_NAME}`))
    .catch((err) => {
      console.error(" MongoDB connection failed:", err.message);
      process.exit(1);
    });
}

module.exports = { connectDB };

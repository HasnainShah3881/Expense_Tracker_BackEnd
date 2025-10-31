require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./src/config/database");

const Authrouter = require("./src/routers/auth");
const Datarouter = require("./src/routers/data");
const Usersrouter = require("./src/routers/users");

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(cookieParser());
app.use(express.json());

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://expense-tracker-frontend.vercel.app", // your frontend URL
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed from this origin: " + origin));
      }
    },
    credentials: true,
  })
);

// ✅ Connect to MongoDB first, then start server
connectDB().then(() => {
  console.log("✅ Database connected successfully");

  app.use("/Auth", Authrouter);
  app.use("/Data", Datarouter);
  app.use("/Users", Usersrouter);

  app.get("/", (req, res) => {
    res.send("Server is running successfully!");
  });

  app.listen(port, () => {
    console.log(`🚀 Server is listening on port ${port}`);
  });
});

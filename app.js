// const express = require("express");
// const app = express();
// // const Datarouter = require("./router/data");
// // const Usersrouter = require("./router/users");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const { locales } = require("validator/lib/isIBAN");
// const Authrouter = require("./src/routers/auth");
// const { connectDB } = require("./src/config/database");
// const Datarouter = require("./src/routers/data");
// const Usersrouter = require("./src/routers/users");
// // const serverless = require("serverless-http");

// const port = 4000;
// app.use(cookieParser());
// app.use(express.json());

//   const allowedOrigins = [
//     // "https://todo-website-theta.vercel.app",
//     "http://localhost:5173"
//   ];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("CORS not allowed from this origin: " + origin));
//       }
//     },
//     credentials: true,
//   })
// );
// connectDB()
//  .then(()=>{
//     console.log("database connected successfully")
//   }).catch((err)=>{
//     console.log('database connection failed',err)
// })
// app.use("/Auth", Authrouter);
// app.use("/Data", Datarouter);
// app.use("/Users", Usersrouter);




// app.listen(port, () => {
//   console.log(`server is listening on ${port}`);
// });
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { connectDB } = require("./src/config/database");
const Authrouter = require("./src/routers/auth");
const Datarouter = require("./src/routers/data");
const Usersrouter = require("./src/routers/users");

const app = express();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Middleware
app.use(cookieParser());
app.use(express.json());

// CORS setup
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173").split(",");
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

// Routers
app.use("/Auth", Authrouter);
app.use("/Data", Datarouter);
app.use("/Users", Usersrouter);
// Suggested Correction for the root route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});
// Connect to MongoDB
connectDB().catch((err) => console.log("Database connection failed:", err));

// Local development server
if (NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}

// Export app for Vercel (serverless)
module.exports = app;

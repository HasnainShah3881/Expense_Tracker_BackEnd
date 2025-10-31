const express = require("express");
const app = express();
// const Datarouter = require("./router/data");
// const Usersrouter = require("./router/users");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { locales } = require("validator/lib/isIBAN");
const Authrouter = require("./src/routers/auth");
const { connectDB } = require("./src/config/database");
const Datarouter = require("./src/routers/data");
const Usersrouter = require("./src/routers/users");
// const serverless = require("serverless-http");

const port = 4000;
app.use(cookieParser());
app.use(express.json());

  const allowedOrigins = [
    "http://localhost:5173",
    "https://expense-tracker-back-end-w9gu.vercel.app"
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
connectDB()
 .then(()=>{
    console.log("database connected successfully")
  }).catch((err)=>{
    console.log('database connection failed',err)
})
app.use("/Auth", Authrouter);
app.use("/Data", Datarouter);
app.use("/Users", Usersrouter);




app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});


// require("dotenv").config();
// const express = require("express");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// const { connectDB } = require("./src/config/database");
// const Authrouter = require("./src/routers/auth");
// const Datarouter = require("./src/routers/data");
// const Usersrouter = require("./src/routers/users");

// const app = express();
// const PORT = process.env.PORT || 4000;
// const NODE_ENV = process.env.NODE_ENV || "development";

// app.use(cookieParser());
// app.use(express.json());

// const allowedOrigins = ("http://localhost:5173").split(",");
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

// app.use("/Auth", Authrouter);
// app.use("/Data", Datarouter);
// app.use("/Users", Usersrouter);
// app.get("/", (req, res) => {
//   res.send("Server is running successfully!");
// });
// connectDB().catch((err) => console.log("Database connection failed:", err));

// if (process.NODE_ENV === "development") {
//   app.listen(PORT, () => {
//     console.log(`Server running locally on http://localhost:${PORT}`);
//   });
// }

// module.exports = app;

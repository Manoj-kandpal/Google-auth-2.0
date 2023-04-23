const express = require("express");
const connectDB = require("./config/db");
const session = require("express-session");
const config = require("config");
const cors = require("cors");
const app = express();
const passport = require("passport");
const path = require("path");
var bodyParser = require("body-parser");
// const cookieSession = require("cookie-session");
require("dotenv").config();
require("./models/User");
require("./services/passport");
require("./services/jwtStrategy");

// Cors
app.use(
  cors({
    // origin: config.get("FRONTEND_URL"), // allow to server to accept request from different origin
    origin: process.env.FRONTEND_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    credentials: true, // allow session cookie from browser to pass through
  })
);

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    // secret: config.get("SESSION_COOKIE_KEY"),
    secret: process.env.SESSION_COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
// app.use(passport.session());

/* ================ Creating Cookie Key and link with Passport JS: End ================  */

// Define Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/user", require("./routes/api/user"));

// const PORT = config.get("PORT") || 3000;
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
//   });
// });

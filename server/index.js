const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var multer = require("multer");
var cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();
var upload = multer();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(
  cookieSession({
    name: "coursemeleon",
    keys: ["authrandomkey"],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
app.use(cors());
app.use(passport.initialize()); // Start using passport
app.use(passport.session()); // Session management

const auth = require("./routes/api/auth");
const posts = require("./routes/api/posts");
const course = require("./routes/api/course");

// Routes
app.use("/api/posts", posts);
app.use("/api/course", course);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

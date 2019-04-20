const cors = require("cors");
const multer = require("multer");
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");

const app = express();
var upload = multer();

// Configuration
require("./config/passport");
require("./config/mongo");
require("./config/jwtConfig");

// Middleware
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(upload.array());
app.use(cors());
app.use(passport.initialize()); // Start using passport
app.use(passport.session()); // Session management

// Routes
const auth = require("./routes/api/auth");
//const posts = require("./routes/api/posts");
const course = require("./routes/api/course");
//app.use("/api/posts", posts);
app.use("/api/course", course);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

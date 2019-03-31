var express = require("express");
var router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../config/jwtConfig");

// Helpers
const schemas = require("../../schema/schema");
const util = require("../../util/util.js");
const code_gen = require("../../util/code_gen");
const mailer = require("../../util/mail");

// Generate a new code and save it to the DB under the user object
// Email target user
function newUserCode(user) {
  const code = code_gen.randPassword();
  user.setCode(code);
  mailer.sendLoginCode(user.email, code);
}

/*// Session filter
const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send("You are not authenticated.");
  } else return next();
};

// This all happens on /api/auth

router.post("/register", authMiddleware, async (req, res) => {
  if (req.body.email && req.body.name) {
    if (util.isAuthorized(req.body.token)) {
      var userData = {
        uname: req.body.uname,
        email: req.body.email
      };
      schemas.User.create(userData, function(err, user) {
        if (err) {
          return res
            .status(400)
            .send(JSON.stringify(err))
            .end();
        } else {
          return res.status(201).end();
        }
      });
    } else {
      res
        .status(401)
        .send({ error: "Missing or invalid Authorization" })
        .end();
    }
  }
});*/

router.post("/login", (req, res, next) => {
  const code = req.body.code;
  const email = req.body.email;
  if (code) {
    passport.authenticate("login", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send([user, "Cannot log in", info]);
      }
      const payload = {
        uid: user.uid,
        expires: Date.now() + 24 * 60 * 60 * 1000
      };
      req.login(payload, { session: false }, err => {
        if (err) {
          res.status(400).send({ err });
        } else {
          const token = jwt.sign(JSON.stringify(payload), jwtSecret.secret);
          //res.cookie("jwt", jwt, { httpOnly: true, secure: true });
          res.status(200).send({
            token: token,
            message: "Logged in"
          });
        }
      });
    })(req, res, next);
  } else {
    schemas.User.byEmail(req.body.email, function(err, user) {
      if (user) {
        console.log(
          "Sending new code to %s === %s",
          email,
          JSON.stringify(user)
        );
        newUserCode(user);
      }
      if (err) console.log(err);
      res.status(200).send();
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  console.log("Logged out");
  return res.send();
});

router.get(
  "/user",
  passport.authenticate("JWT", { session: false }),
  (req, res) => {
    res.send({ user: req.user });
  }
);

module.exports = router;

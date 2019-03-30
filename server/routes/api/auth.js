var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Helpers
const schemas = require("../../schema/schema");
const util = require("../../util/util.js");
const code_gen = require("../../util/code_gen");
const mailer = require("../../util/mail");

// Test data
let users = [
  {
    name: "Test",
    id: "1",
    email: "zdb@purdue.edu"
  }
];

function findUserBy(kvmap) {
  return users.find(user => {
    var res = true;
    for (var key in kvmap) {
      if (kvmap.hasOwnProperty(key) && user.hasOwnProperty(key)) {
        res = (res && kvmap[key] === user[key]) || !!kvmap[key];
      }
    }
    return res;
  });
}

function updateUser(user, set) {
  util.updateOne("Users", user, set);
}

function clearUserCode(user) {
  updateUser(user, { $set: { code: "" } });
}

function newUserCode(user) {
  const code = code_gen.randPassword();
  console.log(code);
  updateUser(user, { $set: { code: code } });
  mailer.sendLoginCode(user.email, code);
}

// Local authentication strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "code"
    },
    function(username, password, done) {
      let user = findUserBy({ email: username, code: password });
      if (user) {
        clearUserCode(user);
        done(null, user);
      } else done(null, false, { message: "Incorrect credentials." });
    }
  )
);

// We only want to store the user id in a cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve the stored user id from the cookie
passport.deserializeUser((id, done) => {
  let user = findUserBy({ id: id });
  done(null, user);
});

// Session filter
const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send("You are not authenticated.");
  } else return next();
};

// This all happens on /api/auth

router.post("/register", async (req, res) => {
  if (req.body.email && req.body.name && req.body.token) {
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
});

router.post("/login", (req, res, next) => {
  const code = req.body.code;
  if (code) {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(400).send([user, "Cannot log in", info]);
      }
      req.login(user, err => {
        res.send("Logged in");
      });
    })(req, res, next);
  } else {
    const user = findUserBy({ email: req.body.email });
    if (user) {
      console.log("Sending new code to %s", JSON.stringify(user));
      newUserCode(user);
    }
    res.status(200).send();
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  console.log("Logged out");
  return res.send();
});

router.get("/user", authMiddleware, (req, res) => {
  let user = users.find(user => {
    return user.id === req.session.passport.user;
  });
  console.log([user, req.session]);
  res.send({ user: user });
});

module.exports = router;

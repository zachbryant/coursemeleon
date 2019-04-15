var express = require("express");
var router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../config/jwtConfig");

// Helpers
const schemas = require("../../schema/schema");
const ACCESS_LEVELS = schemas.Access.ACCESS_LEVELS;
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

// Session filter
/*const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send("You are not authenticated.");
  } else return next();
};

// This all happens on /api/auth
*/

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

router.get(
  "/user/access",
  passport.authenticate("JWT", { session: false }),
  (req, res) => {
    let user = req.user;
    let course = req.course;
    if (user)
      schemas.Access.byUser(user, function(err, access) {
        if (access) {
          console.log(access);
          if (access.length > 0) res.send({ access: access });
          else res.send({ access: "None granted" });
        }
        if (err) console.log(err);
      });
    else if (course) {
      schemas.Access.byCourse(course, function(err, access) {
        if (access) {
          console.log(access);
          if (access.length > 0) res.send({ access: access });
          else res.send({ access: "None granted" });
        }
        if (err) console.log(err);
      });
    } else res.status(400).send();
  }
);

router.delete(
  "/user/access",
  passport.authenticate("JWT", { session: false }),
  (req, res) => {
    let user = req.user;
    let course = req.course;
    if (user && course)
      schemas.Access.remove(
        {
          uid: user.uid,
          cid: course.cid
        },
        function(err, def) {
          if (err) console.log(err);
          if (def)
            console.log(
              "Revvoke access from " +
                JSON.stringify(user) +
                " on " +
                JSON.stringify(course)
            );
        }
      );
    else res.status(400).send();
  }
);

router.put(
  "/user/access",
  passport.authenticate("JWT", { session: false }),
  (req, res) => {
    let requester = req.user;
    let userReq = req.user;
    let course = req.course;
    let accessLevel = req.level;

    schemas.Access.byUserAndLevel(requester, ACCESS_LEVELS.ADMIN, function(
      err,
      ok
    ) {
      if (ok) {
        if (userReq && course) {
          const createFunc = function(user) {
            schemas.Access.create(
              {
                uid: user.uid,
                cid: course.cid,
                level: accessLevel
              },
              function(err, def) {
                if (err) console.log(err);
                if (def)
                  console.log(
                    "Gave access to " +
                      JSON.stringify(user) +
                      "level " +
                      accessLevel
                  );
              }
            );
          };
          if (Array.isArray(userReq)) {
            userReq.forEach(createFunc);
          } else {
            createFunc(userReq);
          }
        } else res.status(400).send();
      } else {
        if (err) console.log(err);

        console.log(
          "No access to " + JSON.stringify(requester) + "level " + accessLevel
        );
      }
    });
  }
);

module.exports = router;

var express = require("express");
var router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../config/jwtConfig");

// Helpers
const schemas = require("../../schema/schema");
const ACCESS_LEVELS = schemas.ACCESS_LEVELS;
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

// This all happens on /api/auth

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
    schemas.User.byEmail(email, function(err, user) {
      if (err) console.log(err);
      if (user) {
        newUserCode(user);
      }
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
  "/user/courses",
  passport.authenticate("JWT", { session: false }),
  (req, res) => {
    let user = req.user;
    console.log(user);
    schemas.Access.byUid(user, function(err, access) {
      if (err) console.log(err);
      if (access) {
        access = access.filter(a => a.level > schemas.ACCESS_LEVELS.NONE);
        schemas.Course.byCidArray(access, function(err1, courses) {
          if (err1) console.log(err1);
          if (courses) {
            let fullCourses = [];
            schemas.User.byUid(user, function(err2, data) {
              if (err2) console.log(err2);
              if (data) {
                let savedCourses = data.savedCourses;
                courses.forEach(course => {
                  fullCourses.push({
                    cid: course.cid,
                    saved:
                      course.cid in savedCourses && savedCourses[course.cid],
                    title: course.course_name,
                    abbr: course.course_abbr
                  });
                });
                console.log(fullCourses);
                res.status(200).send({ saved: fullCourses });
                return;
              }
            });
          }
        });
      }
      res.status(404).send({ message: "Saved courses not found" });
    });
  }
);

router.get(
  "/",
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
  "/",
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
              "Revoke access from " +
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
  "/",
  passport.authenticate("JWT", { session: false }),
  (req, res) => {
    let requester = req.user;
    let userReq = req.body.user;
    let course = req.body.course;
    let accessLevel = req.level;
    console.log(requester);
    schemas.Access.byUserAndLevel(requester, ACCESS_LEVELS.ADMIN, function(
      err,
      ok
    ) {
      if (ok) {
        console.log("Has access to modify users for " + JSON.stringify(course));
        console.log(userReq);
        if (userReq && course) {
          const createFunc = function(userObj) {
            console.log("Adding user to course");
            console.log("User: " + JSON.stringify(userObj));
            console.log("Course: " + course);
            if (userObj.email) {
              schemas.User.byEmail(userObj.email, function(err, user) {
                if (err) console.log(err);
                if (user) {
                  console.log(user);
                  var accessObj = {
                    uid: user.uid,
                    cid: course instanceof Object ? course.cid : course,
                    level: userObj.level
                  };
                  var accessQueryObj = {
                    uid: user.uid,
                    cid: course instanceof Object ? course.cid : course
                  };
                  schemas.Access.findOneAndUpdate(
                    accessQueryObj,
                    accessObj,
                    { upsert: true, new: true },
                    function(err, def) {
                      if (err) console.log(err);
                      if (def)
                        console.log(
                          "Gave access to " +
                            JSON.stringify(user) +
                            "level " +
                            userObj.level
                        );
                    }
                  );
                }
              });
            }
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

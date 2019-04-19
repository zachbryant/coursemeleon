const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const schemas = require("../../schema/schema");
const passport = require("passport");

//Get Posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find().toArray());
  //console.log("hello")
});
//Add post revised, does not need string parsng anymore
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  var str = JSON.stringify(req.body);
  str = str.substring(9, str.length - 2);
  console.log(str);
  var r = str.split("cmsplit");
  await posts.insertOne({
    course_id: r[0],
    course_name: r[1],
    term: r[2],
    term_start: r[3],
    cal_google: r[4],
    cal_ical: r[5]
  });
  res.status(201).send();
});

router.get(
  "/access",
  passport.authenticate(["JWT", "anonymous"], { session: false }),
  (req, res) => {
    let query = req.query;
    let cid = query.cid;
    let user = req.user;
    schemas.Access.hasAccessToCourse(user, { cid: cid }, function(err, access) {
      if (err) console.log(err);
      if (access && access.level >= schemas.ACCESS_LEVELS.ADMIN) {
        schemas.Access.byCourse(cid, function(err, users) {
          if (err) console.log(err);
          if (users) {
            var queryUsers = [];
            var userLevels = {};
            users.forEach(userObj => {
              console.log(userObj.uid);
              queryUsers.push(userObj.uid);
              userLevels[userObj.uid] = userObj.level;
            });
            schemas.User.byUidArray(queryUsers, function(err, fullUsers) {
              if (err) console.log(err);
              if (fullUsers) {
                var userArray = [];
                fullUsers.forEach(fullUser => {
                  var finalUser = {
                    email: fullUser.email,
                    uid: fullUser.uid,
                    level: userLevels[fullUser.uid]
                  };
                  userArray.unshift(finalUser);
                });
                res.status(200).send({ users: userArray });
              } else {
                res.status(200).send({ users: [] });
              }
            });
          }
        });
      } else {
        res
          .status(401)
          .send({ message: "You need to be an admin to do that." });
      }
    });
  }
);

router.get(
  "/get",
  passport.authenticate(["JWT", "anonymous"], { session: false }),
  (req, res) => {
    let query = req.query;
    console.log("Query course: " + JSON.stringify(query));
    let user = req.user;
    schemas.Course.exact(query, function(err, course) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Yikes! That's a server error." });
      } else if (course) {
        const sendCourse = function(access) {
          res.status(200).send({ course: course, level: access.level });
        };
        const sendUnauth = function() {
          res.status(401).send({
            message: "You aren't allowed to view this course.",
            level: schemas.ACCESS_LEVELS.NONE
          });
        };
        const callback = function(err2, access) {
          if (err2) console.log(err2);
          if (
            (access &&
              ((!course.published &&
                access.level >= schemas.ACCESS_LEVELS.EDIT) ||
                (course.whitelist &&
                  user &&
                  access.level >= schemas.ACCESS_LEVELS.VIEW))) ||
            (!course.whitelist && course.published)
          ) {
            sendCourse(access ? access : { level: schemas.ACCESS_LEVELS.VIEW });
          } else {
            sendUnauth();
          }
        };
        schemas.Access.hasAccessToCourse(user, course, callback);
      } else {
        res.status(404).send({ message: "We couldn't find that course" });
      }
    });
  }
);

router.put(
  "/put",
  passport.authenticate("JWT", { session: false }),
  (req, res) => {
    let user = req.user;
    let course = req.body.course;
    schemas.Access.hasAccessToCourse(user, course, function(err, access) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else if (
        !access ||
        (access && access.level >= schemas.ACCESS_LEVELS.EDIT)
      ) {
        // ! Not very safe w/o check for newness of course
        schemas.Course.putOne(course, function(err, ok) {
          if (err) {
            console.log(err);
            res.status(409).send();
          }
          if (ok) {
            if (!access && !err) {
              schemas.Access.create({
                uid: user.uid,
                cid: ok.cid,
                level: schemas.ACCESS_LEVELS.OWNER
              });
            } else {
              // TODO email update
              //util.email
            }
          }
        });
      } else {
        res.status(401).send();
      }
    });
  }
);

//Delete Post
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

//Modify Post
router.put("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.updateOne(
    { _id: new mongodb.ObjectID(req.params.id) },
    {
      $set: {
        course_id: req.body.course_id,
        course_name: req.body.course_name,
        term: req.body.term,
        term_start: req.body.term_start
      }
    }
  );
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://user:7987@coursemeleon-slknn.mongodb.net/test?retryWrites=true",
    {
      useNewUrlParser: true
    }
  );

  return client.db("coursemeleon").collection("Courses");
}

module.exports = router;

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
  "/get",
  passport.authenticate(["JWT", "anonymous"], { session: false }),
  (req, res) => {
    let query = req.query;
    let user = req.user;
    schemas.Course.exact(query, function(err, course) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Server error. See console" });
      } else if (course) {
        if (!course.published) {
          schemas.Access.hasAccessToCourse(user, course, function(
            err2,
            access
          ) {
            if (err2) console.log(err2);
            if (access && access.level >= schemas.ACCESS_LEVELS.EDIT) {
              res.status(200).send(course);
            } else {
              res
                .status(404)
                .send({ message: "Not found: " + JSON.stringify(query) });
            }
          });
        } else if (course.whitelist) {
          if (!user) {
            res.status(401).send({
              message: "User must sign in to access whitelisted course"
            });
          } else {
            schemas.Access.hasAccessToCourse(user, course, function(
              err1,
              access
            ) {
              if (err1) console.log(err1);
              if (access && access.level >= schemas.ACCESS_LEVELS.VIEW) {
                res.status(200).send(course);
              } else {
                res.status(401).send({ message: "User not on whitelist" });
              }
            });
          }
        } else {
          res.status(200).send(course);
        }
      } else {
        res.status(404).send();
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

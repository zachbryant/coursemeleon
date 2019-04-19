const express = require("express");
const mongodb = require("mongodb");
const mail = require("./mail");
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
  //console.log(str)
  var r = str.split("cmsplit");
  console.log(r[9]);
  await posts.insertOne({
    course_id: r[0],
    course_name: r[1],
    term: r[2],
    term_start: r[3],
    cal_google: r[4],
    cal_ical: r[5],
    grades: r[6],
    announcements: "Announcement: " + r[7],
    resources: r[8],
    color: r[9],
    color2: r[10],
    font: r[11],
    pri: r[12]
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
  "/getAll",
  passport.authenticate(["JWT", "anonymous"], { session: false }),
  (req, res) => {
    let query = req.query;
    let user = req.user;
    schemas.Course.exactAll(query, function(err, courses) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Yikes! That's a server error." });
      } else if (courses) {
        console.log("Initial matches: " + courses.length);
        let finalResult = [];
        courses.forEach(course => {
          if (course.published && !course.whitelist) finalResult.push(course);
        });
        console.log("Public courses: " + finalResult.length);
        let cids = [];
        courses.forEach(course => cids.push(course.cid));
        console.log(cids);
        schemas.Access.byUserAndCidArray(user, cids, function(err1, access) {
          if (err1) console.log(err1);
          if (access) {
            console.log("Access: " + access);
            cids = [];
            access.forEach(acc => cids.push(acc.cid));
            schemas.Course.byCidArray(cids, function(err2, result) {
              if (err2) console.log(err2);
              if (result) {
                result.forEach(course => {
                  if (!(course.published && !course.whitelist))
                    finalResult.push(course);
                });
                res.status(200).send({ courses: finalResult });
              } else {
                res.status(404).send({
                  message: "We couldn't find any matches for " + query
                });
              }
            });
          } else {
            res.status(401).send({
              message:
                "You don't have access to any courses under query: " + query
            });
          }
        });
      } else {
        res
          .status(404)
          .send({ message: "We couldn't find any matches for " + query });
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
  var gettit = await posts
    .find({ _id: new mongodb.ObjectID(req.params.id) })
    .toArray();

  console.log(gettit[0]["term_start"]);
  //var my = JSON.stringify(gettit[0]);
  //var s= my.substring(5,10)
  //var json = JSON.stringify(eval("(" + gettit[0] + ")"));
  //console.log(json.course_name)
  //var str = JSON.stringify(req.body);
  //console.log("Nothing")
  //console.log(req.params.id)
  //console.log(req.body.course_name)
  //str=str.substring(9,str.length-2)
  //console.log(str)
  if (req.body.flag == 1) {
    mail.sendLoginCode("rujulakapoor1@gmail.com", 1);
    await posts.updateOne(
      { _id: new mongodb.ObjectID(req.params.id) },
      {
        $set: {
          //"course_id" : req.body.course_id,
          //"course_name": req.body.course_name,
          announcements:
            "Announcement: " +
            req.body.announcements +
            "<bf />" +
            gettit[0]["announcements"]
          //"term": req.body.term,
          //"term_start": req.body.term_start
        }
      }
    );
    res.status(200).send();
  }
  if (req.body.flag == 2) {
    mail.sendLoginCode("rujulakapoo1r@gmail.com", 2);
    await posts.updateOne(
      { _id: new mongodb.ObjectID(req.params.id) },
      {
        $set: {
          //"course_id" : req.body.course_id,
          course_name: req.body.course_name
          //"announcements": req.body.announcements  +gettit[0]["announcements"]
          //"term": req.body.term,
          //"term_start": req.body.term_start
        }
      }
    );
    res.status(200).send();
  }
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://courseUser:chameleon@coursemeleon-ft8ly.mongodb.net/test?retryWrites=true",
    {
      useNewUrlParser: true
    }
  );

  return client.db("coursemeleon").collection("Courses");
}

module.exports = router;

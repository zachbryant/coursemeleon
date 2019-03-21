const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();

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

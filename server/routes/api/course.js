const express = require('express');
const mongodb = require('mongodb');
const mail = require('./mail')
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
  //console.log(str)
  var r = str.split("cmsplit");
  console.log(r[9])
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

router.put('/:id', async (req , res) => {
  
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
  if(req.body.flag==1){
    mail.sendLoginCode("rujulakapoor1@gmail.com",1)
  await posts.updateOne({_id : new mongodb.ObjectID(req.params.id)},
    {$set:{
   
        //"course_id" : req.body.course_id, 
        //"course_name": req.body.course_name,
        "announcements": "Announcement: " +  req.body.announcements + "\n" + gettit[0]["announcements"] 
        //"term": req.body.term,
        //"term_start": req.body.term_start
    }});
  res.status(200).send();
}
if(req.body.flag==2){
  mail.sendLoginCode("rujulakapoo1r@gmail.com",2 )
  await posts.updateOne({_id : new mongodb.ObjectID(req.params.id)},
    {$set:{

        //"course_id" : req.body.course_id, 
        "course_name": req.body.course_name,
        //"announcements": req.body.announcements  +gettit[0]["announcements"] 
        //"term": req.body.term,
        //"term_start": req.body.term_start
    }});
  res.status(200).send();
}

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

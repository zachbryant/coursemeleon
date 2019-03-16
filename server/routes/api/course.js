const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

//Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find().toArray());
  //console.log("hello")
});
//Add post revised, does not need string parsng anymore
router.post('/', async (req , res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    course_id: req.body.course_id,
    course_name: req.body.course_name,
    term: req.body.term,
    term_start: req.body.term_start,
    if_show: false
});
  res.status(201).send();
});

//Delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection(); 
  await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
});


//Modify Post
router.put('/:id', async (req , res) => {
  const posts = await loadPostsCollection();
  await posts.updateOne({_id : new mongodb.ObjectID(req.params.id)},
    {$set:{
        "course_id" : req.body.course_id, 
        "course_name": req.body.course_name,
        "term": req.body.term,
        "term_start": req.body.term_start
    }});
  res.status(200).send(req.body);
});
    
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://user:7987@coursemeleon-slknn.mongodb.net/test?retryWrites=true', {
        useNewUrlParser: true
    })

    return client.db('coursemeleon').collection('Courses');
}

module.exports = router;
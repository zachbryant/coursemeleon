const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({/*query*/}).toArray());
});

//Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date(),
        title: req.body.title
    });
    res.status(201).send();
});

//Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://user:7987@coursemeleon-slknn.mongodb.net/test?retryWrites=true', {
        useNewUrlParser: true
    })

    return client.db('coursemeleon').collection('posts');
}

module.exports = router;
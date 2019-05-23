const express = require('express');
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

const Post = require('./models/post')
const app = express();

mongoose.connect("mongodb+srv://elie:FbnDZnhf92Bd0wHA@cluster0-iyj4n.mongodb.net/node-angular?retryWrites=true",{useNewUrlParser: true})
.then(() => {
  console.log("Connected to database!")
})
.catch(()=>{
  console.log("Connection to database failed")
})

// Get requests from two different servers
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  next();
})

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

// Get a Post from client
app.post('/api/post', (req,res,next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId : createdPost._id
    })
  })
})

// Get Post by ID
app.get('/api/post/:id',(req,res,next) => {
  Post.findById(req.params.id).then(post => {
    if(post){
      res.status(200).json(post)
    } else {
      res.status(404).json({message: "Post not found!"})
    }
  })
})

// Send alll Posts from DB to client
app.get('/api/post', (rex,res,next) => {
  Post.find().then(documents =>{
    res.status(200).json({
      message:"Posts fetched successfully!",
      posts: documents
    });
  })

})

// Update Post
app.put('/api/post/:id',(req,res,next) => {
  const post = new Post( {
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id},post).then(result => {
    console.log(result)
    res.status(200).json({message: 'Updated Post'})
  })
})

// delete a Post
app.delete('/api/post/:id', (req,res,next) => {
  Post.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result)
    res.status(200).json({message: 'Post Deleted!!'})
  })
})

module.exports = app;

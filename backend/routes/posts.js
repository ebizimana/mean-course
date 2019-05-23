const express = require('express');
const Post = require('../models/post')

const router = express.Router()

// Get alll Posts from DB to client
router.get('', (rex,res,next) => {
  Post.find().then(documents =>{
    res.status(200).json({
      message:"Posts fetched successfully!",
      posts: documents
    });
  })

})

// Get one Post by ID
router.get('/:id',(req,res,next) => {
  Post.findById(req.params.id).then(post => {
    if(post){
      res.status(200).json(post)
    } else {
      res.status(404).json({message: "Post not found!"})
    }
  })
})

// Add a Post to DB
router.post('', (req,res,next)=>{
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

// Update Post
router.put('/:id',(req,res,next) => {
  const post = new Post( {
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id},post).then(result => {
    res.status(200).json({message: 'Updated Post'})
  })
})

// Delete a Post
router.delete('/:id', (req,res,next) => {
  Post.deleteOne({_id: req.params.id}).then(result =>{
    res.status(200).json({message: 'Post Deleted!!'})
  })
})

module.exports = router;

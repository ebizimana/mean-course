const express = require('express');
const bodyparser = require('body-parser')
const app = express();

// Get requests from two different servers
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH, DELETE, OPTIONS')
  next();
})

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

// Get Data from client
app.post('/api/post', (req,res,next)=>{
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  })
})

// Send data to client
app.get('/api/post', (rex,res,next) => {
  const posts =[
    {
      id:'1i34u018340kj',
      title: "First server-side post",
      content: 'This is coming from the server'
  },
  {
    id:'1i34u018340kj',
    title: "Second server-side post",
    content: 'This is coming from the server!!'
}];
res.status(200).json({
  message:"Posts fetched successfully!",
  posts: posts
});
})

module.exports = app;

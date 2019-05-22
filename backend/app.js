const express = require('express');
const app = express();

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Header',
  'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH, DELETE, OPTIONS')
  next();
})

app.use('/api/post', (rex,res,next) => {
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

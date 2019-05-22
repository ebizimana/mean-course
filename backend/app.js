const express = require('express');
const app = express();


app.use('/api/post', (rex,res,next) => {
  const post =[
    {
      id:'1i34u018340kj',
      title: "First server-side post",
      content: 'This is coming from the server'
  },
  {
    id:'1i34u018340kj',
    title: "First server-side post",
    content: 'This is coming from the server'
}];
res.status(200).json({
  message:"Posts fetched successfully!",
  post: post
});
})

module.exports = app;

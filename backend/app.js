const express = require('express');
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts')
const app = express();


mongoose.connect("mongodb+srv://elie:FbnDZnhf92Bd0wHA@cluster0-iyj4n.mongodb.net/node-angular?retryWrites=true",{useNewUrlParser: true})
.then(() => {
  console.log("Connected to database!")
})
.catch(()=>{
  console.log("Connection to database failed")
})

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

// Get requests from two different servers
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  next();
})

app.use('/api/post', postRoutes)

module.exports = app;

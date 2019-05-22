const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log("First middleware")
  next()
})

app.use((rex,res,next) => {
  res.send('Hello from express!!')
})

module.exports = app;

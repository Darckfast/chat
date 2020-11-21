import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
// import users from './routes/users';

// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');s

// var users = require('./routes/users')s;

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, 'web')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'web', 'index.html'))
})

app.listen(3333)
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser())

// app.use('/api/v1/users', users);

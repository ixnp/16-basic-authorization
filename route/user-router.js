

'use strict';
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lab17subtwo');
const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const basicAuth = require('../lib/basic-auth-middleware.js')
const User = require('../model/userSchema.js');
const bcrypt = require('bcrypt');

const userRouter = module.exports = new Router();


userRouter.post('/api/signup', jsonParser, function(req, res, next){
  let password = req.body.password;
  delete req.body.password;

  let user = new User(req.body);
  
  user.generatePasswordHash(password)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => res.send(token))
  .catch(next);
});


userRouter.get('/api/signin', basicAuth, function(req, res, next){
  User.findOne({ username: req.auth.username})
  .then( user => user.compareHashedPassword(req.auth.password))
  .then( user => user.generateToken())
  .then( token => res.send(token))
  .catch(next);
});
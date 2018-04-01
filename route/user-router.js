'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const User = require('../model/userSchema.js')
const bcrypt = require('bycrypt');

const userRouter = module.exports = new Router();


userRouter.get('/api/signin/:id', function(req, res){
  let authHeader = req.get('Authorization');
  let payload = authHeader.split('Basic')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let[username, password] = decoded.split(':');
  let hash = function(){
    User.findById(username);
    return user.password; 
  }; 
   //delete this probably i put a new compair method in User//
  bcrypt.compare(password, hash,(err, res) => {
    if(err){
      res.sendStatus(400);
      res.send('wrong password try again', err);
    }else{
      res.sendStatus(200)
        .then(user => res.json(user))
        .then(() => res.send(user))
        .catch(()=> res.sendStatus(400));
    }
  });
});


userRouter.post('/api/signup',jsonParser, function(req, res){
  new User(req.body).save()
  console.log('user', req.body)
  .then(() => res.sendStatus(200))
  .catch(()=> res.sendStatus(400));
});
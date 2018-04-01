

'use strict';
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lab16subtwo');
const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const basicAuth = require('../lib/basic-auth-middleware.js')
const User = require('../model/userSchema.js');
const bcrypt = require('bcrypt');

const userRouter = module.exports = new Router();


// userRouter.get('/api/signin/:id', function(req, res){
//   let authHeader = req.get('Authorization');
//   let payload = authHeader.split('Basic')[1];
//   let decoded = Buffer.from(payload, 'base64').toString();
//   let[username, password] = decoded.split(':');
//   let hash = function(){
//     User.findById(username);
//     return user.password; 
//   }; 
//    //delete this probably i put a new compair method in User//
//   bcrypt.compare(password, hash,(err, res) => {
//     if(err){
//       res.sendStatus(400);
//       res.send('wrong password try again', err);
//     }else{
//       res.sendStatus(200)
//         .then(user => res.json(user))
//         .then(() => res.send(user))
//         .catch(()=> res.sendStatus(400));
//     }
//   });
// });

userRouter.post('/api/signup', jsonParser, function(req, res, next){
  //maybe schema//
  let password = req.body.password;
  delete req.body.password;

  let user = new User(req.body);
  console.log('user',user);
  
  user.generatePasswordHash(password)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => res.send(token))
  .catch(next);
});

userRouter.get('/api/signin', basicAuth, function(req, res, next){
  
});
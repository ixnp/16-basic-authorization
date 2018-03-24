'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lab16bcrypttest');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
});

User.pre('save', function (next) {
  let user = this;
  this.hashedPassword(user.password, function(err, hashed){
    if(err){
      console.log(err);
    }
    user.password = hashed;
  });
  console.log('in userSchema hashed user', user);
  next();
});

User.method.hashPassword = function (userPassword, cb){
  bcrypt.genSalt(10, function (err, salt) {
    if(err){
      return cb(err);
    }
    bcrypt.hash(userPassword, salt, function (err, hashed){
      if(err){
        return cb(err);
      }
  
      return cb(null, hashed);
    });
  });
};


module.exports = mongoose.model('User', User);
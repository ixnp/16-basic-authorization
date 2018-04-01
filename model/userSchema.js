'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lab16bcrypttest');
const bcrypt = require('bcrypt');
const cryto = require('crypto');
const jwt = require('jsonwebtoken');

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
  },
  findHash:{
    type: String, 
    unique: true,
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

User.method.hashPassword = function (userPassword){
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err,hash) =>{
      if(err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};
User.methods.compareHashedPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) =>{
      if(err) return reject(err);
      if(!valid) return reject(createError(401, 'invalid password'));
    });
  });
};

User.methods.generatefindHash = function () {
  return new Promise ((resolve, reject) => {
      let tries = 0;
      _generateFindHash.call(this);
      function _generateFindHash() {
        this.findHash = crypto.randomBytes(32).toString('hex');
        this.save()
        .then(() => resolve(this.findHash))
        .catch(err => {
          if(tries > 30) return reject(err);
          tries++;
          _generateFindHash.call(this);
        });
      }
  });
};

User.methods.generateToken = function(){
  return new Promise((resolve, reject)=>{
    this.generatefindHash()
    .then(findHash => resolve(jwt.sign({token: findHash}, process.env.APP_SECRET)))
  });
}



//write a fun to validate password//

module.exports = mongoose.model('User', User);
'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lab16subtwo');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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



userSchema.methods.generatePasswordHash = function(password){
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) =>{
      if(err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};
userSchema.methods.compareHashedPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if(err) return reject(err);
      if(!valid) return reject(createError(401, 'invalid password'));
      resolve(this);
    });
  });
};

userSchema.methods.generatefindHash = function () {
  return new Promise ((resolve, reject) => {
    let tries = 0;
    _generateFindHash.call(this);
    function _generateFindHash() {
      this.findHash = crypto.randomBytes(32).toString('hex');
      this.save()
        .then(() => resolve(this.findHash))
        .catch(err => {
          if(tries > 3) return reject(err);
          tries++;
          _generateFindHash.call(this);
        });
    }
  });
};

userSchema.methods.generateToken = function(){
  return new Promise((resolve, reject)=>{
    this.generatefindHash()
    .then(findHash => resolve(jwt.sign({token: findHash}, process.env.APP_SECRET)))
    .catch(err => reject(err));
  });
};





module.exports = mongoose.model('User', userSchema);
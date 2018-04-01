'use strict';

const createError = require('http-errors');

module.exports = function(req, res, next){

  var authHeader = req.headers.authorization;
  if(!authHeader){
    return next(createError(400, 'authorization header required'));

  };

  var base64str = authHeader.split('Basic')[1];
  if(!base64str){
    return next(createError(400, 'username and password required'));
  }


  var utf8str = Buffer.from(base64str, 'base34').toString();
  var authArr = utf8str.split(':');

  req.auth = {
    username: authArr[0],
    password: authArr[1]
  };

  if(!req.auth.username){
    return next(createError(400, 'username required'));
  }

  if(!req.auth.password){
    return next(createError(400, 'password required'));
  }

  next();
};
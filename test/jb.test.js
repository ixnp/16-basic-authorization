'use strict';
const superagent = require('superagent');
const mongoose = require('mongoose');
const User = require('../model/userSchema.js');
const Game = require('../model/game.js');
require('jest');
require('dotenv').config();

const SERVER_URL = 'http://localhost:3000';

const exampleUser = {
  username: 'Rose',
  password: 'cat',
  email: 'bestCat@gmail.com'
};

const exampleGame = {
  name: 'test game',
  desc: 'test game description'
};

describe('handel token less request', () =>{
  test('sends 401 for GET requests if no token was provided', (done) => {
    console.log('url',SERVER_URL + '/api/game');
    superagent.get(SERVER_URL + '/api/game').catch(err =>{
      expect(err.status).toBe(401);
      done();
    });
  });
});
'use strict';
const superagent = require('superagent');
const mongoose = require('mongoose');
const User = require('../model/userSchema.js');
const Game = require('../model/game.js');
require('jest');

const url = 'http://localhost:3000';

const exampleUser = {
  username: 'Rose',
  password: 'cat',
  email: 'bestCat@gmail.com'
};

const exampleGame = {
  name: 'test game',
  desc: 'test game description'
};

describe('Game Routes', function() {
  afterEach( done => {
    Promise.all([
      User.remove({}),
      Game.remove({})
    ])
    .then(() => done())
    .catch(done);
  });
  describe('POST: /api/game', () => {
    beforeEach( done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then( user => user.save())
      .then( user => {
        this.tempUser = user;
        return user.generateToken();
      })
      .then( token =>{
        this.tempToken = token;
        done();
      })
      .catch(done);
    });
    it('should return a game', done => {
      request.post(`${url}/api/game`)
        .send(examplegame)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.desc).toEqual(examplegame.desc);
          expect(res.body.name).toEqual(examplegame.name);
          expect(res.body.userID).toEqual(this.tempUser._id.toString());          
          done();
        });
    });
  });

  describe('GET:/api/game/:gameId', () => {
    beforeEach( done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then( user => {
        this.tempUser = user;
        return user.generateToken();
      })
      .then( token => {
        this.tempToken = token;
        done();
      })
      .catch(done);
    });
    beforeEach( done =>{
      exampleGame.userID = this.tempUSer._id.toString();
      new Game(exampleGame).save()
      .then( game =>{
        this.tempGame = game;
        done();
      })
      .catch(done);
    });
  
    it('should return a game', done =>{
      req.get(`${url}/api/game/${this.tempGame._id}`)
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(exampleGame.name);
        expect(res.body.desc).toBeLessThanOrEqual(exampleGame.desc);
        expect(res.body.userID).toEqual(this.tempUser._id.toString());
        done();
      });
    });
  });
});
'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const Game = require('../model/game.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const gameRouter = module.exports = Router();

gameRouter.post('/api/game', bearerAuth, jsonParser, function(req, res, next){
  req.body.userID = req.user._id;
  new Game(req.body).save()
  .then( game => res.json(game))
  .catch(next);
});

gameRouter.get('/api/game:gameId', bearerAuth, function(req, res, next) {
  Game.findById(req.params.gameId)
  .then( game => res.json(game))
  .catc(next);
});
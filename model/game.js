'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: {type: String, required: true},
  desc: {type: String, required: true},
  userID:{type: Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('game', gameSchema);
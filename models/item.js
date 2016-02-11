'use strict';

var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  name: { type: String },
  description: { type: String }
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
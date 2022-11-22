'use strict';

const mongoose = require('../../lib/mongo/mongo-handler')();
const schema = new mongoose.Schema({
    userId: {type: String, index: 1, required: true},
    meditation: {type: String, required: true},
    attention: {type: String, required: true},
    date: {type: Date, default: Date.now, index: 1},
    createdAt: {type: Date, default: Date.now, index: 1}
  }, {
    versionKey: false
  }
);

module.exports = mongoose.model('metaDatas', schema, 'metaDatas');

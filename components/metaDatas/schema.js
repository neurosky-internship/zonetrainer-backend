'use strict';

const mongoose = require('../../lib/mongo/mongo-handler')();
const schema = new mongoose.Schema({
    userId: {type: String, index: 1, required: true},
    meditation: {type: Number, required: true},
    attention: {type: Number, required: true},
    timestamp: {type: Date, default: Date.now, index: 1},
    createdAt: {type: Date, default: Date.now, index: 1}
  }, {
    versionKey: false
  }
);

module.exports = mongoose.model('metaDatas', schema, 'metaDatas');

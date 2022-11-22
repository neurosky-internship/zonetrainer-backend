'use strict';

const mongoose = require('../../lib/mongo/mongo-handler')();
const schema = new mongoose.Schema({
    userId: {type: String, index: 1, required: true},
    avgData: {type: String, required: true},
    minData: {type: String, required: true},
    maxData: {type: String, required: true},
    date: {type: Date, default: Date.now, index: 1},
    createdAt: {type: Date, default: Date.now, index: 1}
  }, {
    versionKey: false
  }
);

module.exports = mongoose.model('attentions', schema, 'attentions');

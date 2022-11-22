'use strict';

const mongoose = require('../../lib/mongo/mongo-handler')();
const schema = new mongoose.Schema({
    userId: {type: String, index: 1, required: true},
    avgData: {type: Number, required: true},
    minData: {type: Number, required: true},
    maxData: {type: Number, required: true},
    date: {type: Date, default: Date.now, index: 1},
    createdAt: {type: Date, default: Date.now, index: 1}
  }, {
    versionKey: false
  }
);

module.exports = mongoose.model('attentions', schema, 'attentions');

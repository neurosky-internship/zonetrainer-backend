'use strict';

const mongoose = require('../../lib/mongo/mongo-handler')();
const schema = new mongoose.Schema({
    userId: {type: String, index: 1, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    recentData: {type: [String]},
    updatedAt: {type: Date, default: Date.now, index: 1},
    createdAt: {type: Date, default: Date.now, index: 1}
  }, {
    versionKey: false
  }
);

module.exports = mongoose.model('users', schema, 'users');

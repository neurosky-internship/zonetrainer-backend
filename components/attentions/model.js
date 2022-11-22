'use strict';

const schema = require('./schema');
const Model = require('../../lib/mongo/model');

class attentionsModel extends Model {
  constructor(model, properties) {
    super(model, properties);
    // this.exactQueryFields = ['_id', 'phone', 'email'];
  }

}

module.exports = new attentionsModel(schema);

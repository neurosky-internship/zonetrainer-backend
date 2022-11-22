'use strict';

const schema = require('./schema');
const Model = require('../../lib/mongo/model');

class meditationsModel extends Model {
  constructor(model, properties) {
    super(model, properties);
    // this.exactQueryFields = ['_id', 'phone', 'email'];
  }

}

module.exports = new meditationsModel(schema);

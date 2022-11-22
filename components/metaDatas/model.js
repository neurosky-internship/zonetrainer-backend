'use strict';

const schema = require('./schema');
const properties = require('./properties');
const Model = require('../../lib/mongo/model');

class metaDatasModel extends Model {
  constructor(model, properties) {
    super(model, properties);
    // this.exactQueryFields = ['_id', 'phone', 'email'];
  }

}

module.exports = new metaDatasModel(schema, properties);

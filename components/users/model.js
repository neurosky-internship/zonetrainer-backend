'use strict';

const userSchema = require('./schema');
const properties = require('./properties');
const Model = require('../../lib/mongo/model');

class UsersModel extends Model {
  constructor(model, properties) {
    super(model, properties);
    // this.exactQueryFields = ['_id', 'phone', 'email'];
  }

}

module.exports = new UsersModel(userSchema, properties);

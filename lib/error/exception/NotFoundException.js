'use strict';

const ServiceException = require('./ServiceException');

class NotFoundException extends ServiceException{
  constructor(message) {
    super({status: 404, message});
  }
}

module.exports = NotFoundException;
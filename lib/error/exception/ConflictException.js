'use strict';

const ServiceException = require('./ServiceException');

class ConflictException extends ServiceException{
  constructor(message) {
    super({status: 409, message});
  }
}

module.exports = ConflictException;
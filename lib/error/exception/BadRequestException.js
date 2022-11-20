'use strict';

const ServiceException = require('./ServiceException');

class BadRequestException extends ServiceException{
  constructor(message) {
    super({status: 400, message});
  }
}

module.exports = BadRequestException;
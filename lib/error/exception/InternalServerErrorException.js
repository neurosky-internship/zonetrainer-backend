'use strict';

const ServiceException = require('./ServiceException');

class InternalServerErrorException extends ServiceException{
  constructor(message) {
    super({status: 500, message});
  }
}

module.exports = InternalServerErrorException;
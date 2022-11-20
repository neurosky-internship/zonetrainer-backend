'use strict';

const ServiceException = require('./ServiceException');

class UnauthorizedException extends ServiceException{
  constructor(message) {
    super({status: 401, message});
  }
}

module.exports = UnauthorizedException;
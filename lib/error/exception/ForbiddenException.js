'use strict';

const ServiceException = require('./ServiceException');

class ForbiddenException extends ServiceException{
  constructor(message) {
    super({status: 403, message});
  }
}

module.exports = ForbiddenException;
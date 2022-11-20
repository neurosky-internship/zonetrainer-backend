'use strict';

const ServiceException = require('./ServiceException');

class ServiceUnavailableException extends ServiceException{
  constructor(message) {
    super({status: 503, message});
  }
}

module.exports = ServiceUnavailableException;
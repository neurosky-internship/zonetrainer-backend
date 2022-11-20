'use strict';

const errorCodes = require('../code/error-codes.json');
const statusCodes = require('../code/status-codes.json');
const mongoose = require('../../mongo/mongo-handler')();

class ServiceException {
  constructor(options) {
    this.init(options);
    Error.captureStackTrace(this, ServiceException);
  }

  init(options) {
    if(typeof options === 'string') {
      this.typeString(options);
    } else if(typeof options === 'object') {
      this.typeObject(options);
    } else if(typeof options === 'number') {
      this.typeCode(options);
    } else {
      this.typeStatus(500);
    }
  }

  typeString(message) {
    this.setError({message});
  }

  typeObject(options) {
    if(options instanceof mongoose.Error.ValidationError) {
      this.setError({status: 400, message: Object.values(options.errors)[0].message})
    } else {

      const statusCode = options.status && !options.message ? statusCodes[options.status] : {status: options.status, message: options.message};

      if(options.data)
        statusCode.data = options.data;

      this.setError(statusCode || {});
    }
  }

  typeCode(code) {
    const errorCode = errorCodes[code];

    this.setError(errorCode || {});
  }

  typeStatus(status) {
    this.setError(statusCodes[status] || {});
  }

  setError({status=500, message='Internal Server Error', data = {}}) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  setStatus(status=500) {
    this.status = status;
  }
}

module.exports = ServiceException;
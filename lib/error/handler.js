'use strict';

exports.errorHandler = (err, req, res, next) => {
  if(typeof err === 'object' && err.status && err.stack) {
    logger.error(`${err.status || ''}\t${err.stack || ''}`);
    res.status(err.status).json({message: err.message, data: err.data});
  } else {
    const error = new GE.ServiceException(err);

    logger.error(`${error.status || 500}\t${error.stack || err}`);
    res.status(error.status || 500).json({message: error.message || 'Internal Server Error'});
  }
};

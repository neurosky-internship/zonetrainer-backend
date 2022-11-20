'use strict';

const configLoader = require('../../config');

global._ = require('lodash');
global.config = configLoader.config;
global.logger = require('../winston/logger').logger;
global.GE = require('../error/exception');
const mongo = require('../mongo/mongo-handler')();

exports.load = async () => {
  logger.info('Load env : ' + config.env);
  await configLoader.init();
  await mongo.init();
}
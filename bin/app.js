'use strict';

const load = require('../lib/loader').load;
const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const {errorHandler} = require('../lib/error/handler');
(async () => {
  try {
    await load();

    app.enable('trust proxy');
    app.use(bodyParser.urlencoded({extended: false, limit: '30mb'}));
    app.use(bodyParser.json({limit: '30mb'}));
    app.use(require('../routes/api'));
    app.use((req, res, next) => {
      res.status(404).send({message: 'Not Found'});
    });
    app.use(errorHandler);
    const server = http.createServer(app).listen(config.server.port, '0.0.0.0', () => {
      logger.info('API server start.');
    });
  } catch(err) {
    logger.error(err);
  }
})();
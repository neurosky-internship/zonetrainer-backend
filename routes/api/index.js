'use strict';

const express = require('express');
const app = express();

if(!config.isProduction) {
  const { swaggerUi, specs } = require('./swagger');

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

app.use('/auth', require('../../components/auth'));

module.exports = app;

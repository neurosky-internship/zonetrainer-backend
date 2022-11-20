'use strict';

const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');
const path = require('path');
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API with express',
    },
    host: `${config.server.baseUrl}:${config.server.port}`,
    basePath: '/',
    security: [
      {
        api_key: []
      }
    ]
  },
  apis: [
    `${path.resolve(__dirname, '../../../components')}/**/index.js`,
    `${path.resolve(__dirname, './schema/')}/index.js`
  ]
};
const specs = swaggereJsdoc(options);

Object.assign(specs, require('./schema'));

module.exports = {
  swaggerUi,
  specs
};
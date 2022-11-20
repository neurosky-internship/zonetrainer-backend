'use strict';

const schemas = {};
Object.assign(schemas, require('./auth'));

module.exports = {
  components: {
    schemas,
    securitySchemes: {
      api_key: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    }
  }
}
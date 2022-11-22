'use strict';

const schemas = {};
Object.assign(schemas, require('./auth'));
Object.assign(schemas, require('./home'));

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
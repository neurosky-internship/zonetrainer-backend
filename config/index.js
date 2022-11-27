'use strict';

require('dotenv').config();
class ConfigLoader {
  constructor() {
    this.env = {
      local: 'local',
    }
    this.config = require(`./${this.env[process.env.NODE_ENV] || 'local'}.json`);
    this.config.env = process.env.NODE_ENV || 'local';
    this.config.isLocal = ['local', 'test'].includes(this.config.env);
    this.config.isDevelop = this.config.env === 'develop';
    this.config.isProduction = this.config.env === 'production';

    if (!this.config.isProduction && process.env.BRANCH) {
      this.config.internal.sellerApiUrl = `https://${process.env.BRANCH}-seller-api.wingeat.com`;
    }
  }

  async init() {
  }
}

module.exports = new ConfigLoader();
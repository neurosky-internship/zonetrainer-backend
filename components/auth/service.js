'use strict';

const usersModel = require('../users/model');

class authService {
  constructor() {
  }

  async findUserId(userId) {
    return await usersModel.findOne({userId});
  }
  async addUser(info) {
    return await usersModel.add(info);
  }
}

module.exports = new authService();
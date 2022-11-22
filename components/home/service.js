'use strict';

const metaDatas = require('../metaDatas/schema');
const attention = require('../attentions/schema');
const meditation = require('../meditations/schema');
const attentionModel = require('../attentions/model');
const meditationModel = require('../meditations/model');

class homeService {
  constructor() {
  }

  async isExistData(today, tomorrow){
    return await metaDatas.find({date : {$lte : tomorrow, $gte : today}},{_id:0,attention:1,meditation:1});
  }

  async isExistAvgMinMaxData(today, tomorrow){
    return attentionModel.findOne({date : {$lte : tomorrow, $gte : today}});
  }

  async addMetaData(info) {
    return await metaDatas.insertMany(info);
  }

  async addAvgMinMaxData(info) {
    await attentionModel.add(info[0]);
    await meditationModel.add(info[1]);
  }

  async updateAvgMinMaxData(date, info) {
    await attention.update({date}, info[0]);
    await meditation.update({date}, info[1]);
  }
}

module.exports = new homeService();
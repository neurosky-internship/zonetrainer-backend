'use strict';
const moment = require('moment');
const metaDatas = require('../metaDatas/schema');
const attention = require('../attentions/schema');
const meditation = require('../meditations/schema');
const attentionModel = require('../attentions/model');
const meditationModel = require('../meditations/model');
const usersModel = require('../users/model');
const users = require('../users/schema');

class homeService {
  constructor() {
  }

  async isExistData(today, tomorrow){
    return await metaDatas.find({date : {$lte : tomorrow, $gte : today}},{_id:0,attention:1,meditation:1});
  }

  async isExistAvgMinMaxData(today, tomorrow){
    return attentionModel.findOne({date : {$lte : tomorrow, $gte : today}});
  }

  async getRecentData(userId){
    const isExist = await usersModel.findOne({userId},{_id:0,recentData:1,updatedAt:1});
    if(!isExist){
      return;
    }
    let attention = parseInt(isExist.recentData[0]) || -1;
    let meditation = parseInt(isExist.recentData[1]) || -1;
    switch (true){
      case (attention < 30):
        attention = "bad";
        break;
      case (attention < 60):
        attention = "good";
        break;
      case (attention < 100):
        attention = "perfect";
        break;
      default:
        attention = "no data";
        break;
    }
    switch (true){
      case (0 < meditation < 30):
        meditation = "bad";
        break;
      case (meditation < 60):
        meditation = "good";
        break;
      case (meditation < 100):
        meditation = "perfect";
        break;
      default:
        meditation = "no data";
        break;
    }
    // 11/10 at 11:06 pm
    const updatedAt = isExist.updatedAt;
    let date = updatedAt.getMonth() + '/' + updatedAt.getDate() + ' at ' + updatedAt.getHours() + ':' + updatedAt.getMinutes();
    return [attention,meditation,date,updatedAt];
  }

  async getGraphData(userId){
    const attentionData = [];
    const meditationData = [];
    for(let i = 0; i < 7; i++){
      let date = moment().subtract(6-i,'day').startOf('day').toDate();
      let result =
        await attentionModel.findOne(
          {date : {$lte : date, $gte : date},userId},
          {_id:0,avgData:1,minData:1,maxData:1,date:1}
        );
      let result2 =
        await meditationModel.findOne(
          {date : {$lte : date, $gte : date},userId},
          {_id:0,avgData:1,minData:1,maxData:1,date:1}
        );
      if(!result){
        result = Object.assign( {avgData:0,minData:0,maxData:0},{date:date});
      }
      if(!result2){
        result2 = Object.assign( {avgData:0,minData:0,maxData:0},{date:date});
      }
      attentionData.push(result);
      meditationData.push(result2);
    }
    return {attentionData, meditationData};
  }

  async addMetaData(info) {
    return await metaDatas.insertMany(info);
  }

  async updateRecentData(metaData, userId) {
    let attention = [];
    let meditation = [];
    if(metaData !== 'undefined'){
      attention = (metaData).map(md => md.attention).sort() || [];
      meditation = (metaData).map(md => md.attention).sort() || [];
    }
    const attentionLength = attention.length;
    const meditationLength = meditation.length;
    const avgData = Array.isArray(meditation) ? (meditation.reduce((a, c) => parseInt(a) + parseInt(c), 0)/attentionLength).toString(): 0;
    const avgData2 = Array.isArray(meditation) ? (meditation.reduce((a, c) => parseInt(a) + parseInt(c), 0)/meditationLength).toString() : 0;
    await users.update({userId},{recentData : [avgData,avgData2], updatedAt : new Date()});
    return {userid : userId, recentData: [avgData,avgData2]}
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
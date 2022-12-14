'use strict';

const homeService = require('./service');
const moment = require('moment');

exports.makeAvgMinMaxData = async  (beforeMetaData) => {
  try {
    let beforeAttention = [];
    let beforeMeditation = [];
    if(beforeMetaData !== 'undefined'){
      beforeAttention = (beforeMetaData).map(md => md.attention).sort() || [];
      beforeMeditation = (beforeMetaData).map(md => md.meditation).sort() || [];
    }
    const attentionLength = beforeAttention.length;
    const meditationLength = beforeMeditation.length;

    const avgData = Array.isArray(beforeAttention) ? (beforeAttention.reduce((a, c) => parseInt(a) + parseInt(c), 0)/attentionLength): 0;
    let minData = Array.isArray(beforeAttention) ? beforeAttention[0] : 0;
    let maxData = Array.isArray(beforeAttention) ? beforeAttention[attentionLength-1] : 0;

    const avgData2 = Array.isArray(beforeMeditation) ? (beforeMeditation.reduce((a, c) => parseInt(a) + parseInt(c), 0)/meditationLength) : 0;
    let minData2 = Array.isArray(beforeMeditation) ? beforeMeditation[0] : 0;
    let maxData2 = Array.isArray(beforeMeditation) ? beforeMeditation[meditationLength-1] : 0;

    const attentionInfo = {avgData : avgData, minData : minData, maxData: maxData};
    const meditationInfo = {avgData : avgData2, minData : minData2, maxData: maxData2};

    return [attentionInfo, meditationInfo];
  }
  catch (err){

  }
}

exports.addAvgMinMaxData = async (userId) => {
  try {
    const today = moment().add(0,'day').startOf('day').toDate();
    const tomorrow = moment().add(0, 'day').endOf('day').toDate();
    const beforeMetaData = await homeService.isExistData(today, tomorrow);

    let info = await this.makeAvgMinMaxData(beforeMetaData);

    const isExistAvgMinMaxData = await homeService.isExistAvgMinMaxData(today, tomorrow);
    const attentionResult = Object.assign({userId : userId, date : today} , info[0])
    const meditationResult = Object.assign({userId : userId, date : today} , info[1])
    if(!isExistAvgMinMaxData){
    return await homeService.addAvgMinMaxData([attentionResult,meditationResult]);
    }
    else{
      await homeService.updateAvgMinMaxData(today,[attentionResult,meditationResult]);
    }

    return [attentionResult, meditationResult];

  }
  catch (err) {
  }
};

exports.addData = async (req, res, next) => {
  try {
    const attentionData = req.body.attentionData;
    const meditationData = req.body.meditationData;

    const userId = req.body.userId;

    attentionData.forEach(md => {md.userId = userId;})
    for(let i = 0; i<attentionData.length; i++){
      attentionData[i].meditation = meditationData[i].meditation || 0;
    }
    const metaDataResult = await homeService.addMetaData(attentionData);
    const recentDataResult = await homeService.updateRecentData(attentionData, userId);
    const twoDataResult =  await this.addAvgMinMaxData(userId);

    res.json({metaDataResult, recentDataResult, twoDataResult});
  }
  catch (err) {
    next(err);
  }
};

exports.getRecentData = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await homeService.getRecentData(userId);
    if(!result){
      res.json({attention : -1,meditation: -1})
    }
    else{
      res.json(result);
    }
  }
  catch (err) {
    next(err);
  }
};

exports.getGraphData = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const graphResult = await homeService.getGraphData(userId);
    res.json(graphResult);
  }
  catch (err) {
    next(err);
  }
};

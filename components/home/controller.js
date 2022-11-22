'use strict';

const homeService = require('./service');
const moment = require('moment');

exports.makeAvgMinMaxData = async  (beforeMetaData) => {
  try {
    let beforeAttention = [];
    let beforeMeditation = [];
    if(beforeMetaData !== 'undefined'){
      beforeAttention = (beforeMetaData).map(md => md.attention).sort() || [];
      beforeMeditation = (beforeMetaData).map(md => md.attention).sort() || [];
    }
    const attentionLength = beforeAttention.length;
    const meditationLength = beforeMeditation.length;

    const avgData = Array.isArray(beforeAttention) ? (beforeAttention.reduce((a, c) => parseInt(a) + parseInt(c), 0)/attentionLength).toString(): 0;
    let minData = Array.isArray(beforeAttention) ? beforeAttention[0] : 0;
    let maxData = Array.isArray(beforeAttention) ? beforeAttention[attentionLength-1] : 0;

    const avgData2 = Array.isArray(beforeMeditation) ? (beforeMeditation.reduce((a, c) => parseInt(a) + parseInt(c), 0)/meditationLength).toString() : 0;
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
    const metaData = req.body.data;
    const userId = req.body.userId;

    metaData.forEach(md => {md.userId = userId;})
    const metaDataResult = await homeService.addMetaData(metaData);
    const twoDataResult =  await this.addAvgMinMaxData(userId);

    res.json({metaDataResult, twoDataResult});
  }
  catch (err) {
    next(err);
  }
};


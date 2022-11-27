'use strict';

const authService = require('./service');
const {OAuth2Client} = require('google-auth-library');
const clientId = require('../../config/local.json').googleCredentials.client_id
const client = new OAuth2Client(clientId);

exports.authGoogle = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const isExist = await authService.findUserId(userId);
    if(isExist){
      res.json({message : "이미 존재하는 Id입니다."});
    }
    else{
      const result = await authService.addUser({userId});
      res.json(result);
    }
  }
  catch (err) {
    next(err);
  }
};
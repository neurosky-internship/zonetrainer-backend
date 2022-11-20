'use strict';

const authService = require('./service');
const {OAuth2Client} = require('google-auth-library');
const clientId = require('../../config/local.json').googleCredentials.client_id
const client = new OAuth2Client(clientId);

exports.authGoogle = async (req, res, next) => {
  try {
    const token = req.body.token;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];

    const isExist = await authService.findUserId(userId);

    if(isExist){
      res.json(isExist);
    }
    else{
      const newUserDoc = {
        userId,
        email: payload.email,
        name: payload.name
      }
      const result = await authService.addUser(newUserDoc);
      res.json(result);
    }
  }
  catch (err) {
    next(err);
  }
};
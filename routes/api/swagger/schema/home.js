module.exports = {
  homeRequest: {
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        description: '유저 아이디',
        example: '123ABC'
      },
      data: {
        type: 'object',
        description: '측정 데이터',
        example:[{
                    "timestamp" : "2000-10-00T10:00:00",
                    "attention" : 10,
                    "meditation" : 10
                  },
                  {
                    "timestamp" : "2000-10-00T10:00:01",
                    "attention" : 20,
                    "meditation" : 20
                  },
                  {
                    "timestamp" : "2000-10-00T10:00:02",
                    "attention" : 30,
                    "meditation" : 30
                  }],
      },
    }
  },
  HomeResponse: {
    type: 'object',
    properties: {
      metaDataResult: {
        type: 'object',
        description: '메타 데이터 결과값',
        example:
          [
          {
            "_id": "637c6fa546887286939ba6ad",
            "attention": "10",
            "meditation": "10",
            "userId": "12",
            "date": "2022-11-22T06:43:49.428Z",
            "createdAt": "2022-11-22T06:43:49.428Z"
          },
          {
            "_id": "637c6fa546887286939ba6ae",
            "attention": "20",
            "meditation": "20",
            "userId": "12",
            "date": "2022-11-22T06:43:49.428Z",
            "createdAt": "2022-11-22T06:43:49.428Z"
          },]
      },
      twoDataResult: {
        type: 'object',
        description: 'attention, meditation 데이터 결과값',
        example:
          [
            {
              "userId": "12",
              "date": "2022-11-21T15:00:00.000Z",
              "avgData": "20",
              "minData": "10",
              "maxData": "30"
            },
            {
              "userId": "12",
              "date": "2022-11-21T15:00:00.000Z",
              "avgData": "20",
              "minData": "10",
              "maxData": "30"
            }
          ]
      },
    }
  }
}
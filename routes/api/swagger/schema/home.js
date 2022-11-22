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
            "attention": 10,
            "meditation": 10,
            "userId": "12",
            "date": "2022-11-22T06:43:49.428Z",
            "createdAt": "2022-11-22T06:43:49.428Z"
          },
          {
            "_id": "637c6fa546887286939ba6ae",
            "attention": 20,
            "meditation": 20,
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
              "avgData": 20,
              "minData": 10,
              "maxData": 30
            },
            {
              "userId": "12",
              "date": "2022-11-21T15:00:00.000Z",
              "avgData": 20,
              "minData": 10,
              "maxData": 30
            }
          ]
      },
    }
  },
  GraphResponse: {
    type: 'object',
    properties: {
      attentionData: {
        type: 'object',
        description: 'attention 데이터 7일치 (마지막 날이 오늘)',
        example:
          [
            {
              "avgData": 0,
              "minData": 0,
              "maxData": 0,
              "date": "2022-11-15T15:00:00.000Z"
            },
            {
              "avgData": 0,
              "minData": 0,
              "maxData": 0,
              "date": "2022-11-16T15:00:00.000Z"
            },
            {
              "avgData": 0,
              "minData": 0,
              "maxData": 0,
              "date": "2022-11-17T15:00:00.000Z"
            },
            {
              "avgData": 0,
              "minData": 0,
              "maxData": 0,
              "date": "2022-11-18T15:00:00.000Z"
            },
            {
              "avgData": 0,
              "minData": 0,
              "maxData": 0,
              "date": "2022-11-19T15:00:00.000Z"
            },
            {
              "avgData": 0,
              "minData": 0,
              "maxData": 0,
              "date": "2022-11-20T15:00:00.000Z"
            },
            {
              "date": "2022-11-21T15:00:00.000Z",
              "avgData": 20,
              "minData": 10,
              "maxData": 30
            }
          ]
      },
      meditationData: {
        type: 'object',
        description: 'meditation 데이터 7일치 (마지막 날이 오늘)',
        example:
          [
            {
              "avgData": 0,
              "minData": 0,
              "maxData": 0,
              "date": "2022-11-15T15:00:00.000Z"
            },
            {
              "avgData": 0,
              "minData": 0,
              "maxData": 0,
              "date": "2022-11-16T15:00:00.000Z"
            },
            {
              "avgData": 0,
              "minData": 0,
              "maxData": 0,
              "date": "2022-11-17T15:00:00.000Z"
            },
            {
              "avgData": 0,
              "minData": 0,
              "maxData": 0,
              "date": "2022-11-18T15:00:00.000Z"
            },
            {
              "avgData": 0,
              "minData": 0,
              "maxData": 0,
              "date": "2022-11-19T15:00:00.000Z"
            },
            {
              "avgData": 0,
              "minData": 0,
              "maxData": 0,
              "date": "2022-11-20T15:00:00.000Z"
            },
            {
              "date": "2022-11-21T15:00:00.000Z",
              "avgData": 20,
              "minData": 10,
              "maxData": 30
            }
          ]
      },
    }
  },
  RecentResponse: {
    type: 'object',
    example:
      {
        "attention": "bad",
        "meditation": "bad",
        "date": "10/22 at 22:19",
        "updatedAt": "2022-11-22T13:19:19.193Z"
      }
  }
}
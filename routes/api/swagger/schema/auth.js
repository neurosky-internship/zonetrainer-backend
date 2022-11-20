module.exports = {
  LoginRequest: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        description: '토큰값',
        example: '123ABC'
      },
    }
  },
  LoginResponse: {
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        description: '유저 아이디',
        example: '0101a234b1234c'
      },
      email: {
        type: 'string',
        description: '이메일',
        example: 'thismyouyh@gmail.com'
      },
      name: {
        type: 'string',
        description: '이름',
        example: '김보현'
      }
    }
    }
}
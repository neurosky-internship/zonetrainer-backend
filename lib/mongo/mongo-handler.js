'use strict';

const mongoose = require('mongoose');

mongoose.connection.on('error', (err) => {
  logger.error(err.message);
  process.exit(1);
});

// disconnected 는 최초 몽고 연결 실패시와, 연결중 커넥션 로스트시 발생함
mongoose.connection.on('disconnected', () => {
  logger.error('Connection Lost or Fail');
});

mongoose.connection.on('reconnectFailed', (err) => {
  logger.info('Reconnect to MongoDB Failed. Terminate Process');
  mongoose.connection.close();
  process.exit(1);
});

mongoose.connection.on('open', () => {
  mongoose.Promise = global.Promise;
  logger.info('Mongo connection has been completed');
});

mongoose.init = async () => {
  const {primaryUri, name} = config.db;

  await mongoose.connect(primaryUri, {
    // useUnifiedTopology: true,
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    dbName: name,
    // poolSize: 10
  });
  mongoose.mongoIdSchema = {
    type: String,
    required: true,
    default: mongoose.Types.ObjectId,
    validate: {
      validator: function(val) {
        const isValid = mongoose.Types.ObjectId.isValid(val);

        if (!isValid)
          throw new Error('Mongo _id type is invalid');
      },
      message: props => {
        let errorMessage = `${props.path || ''} field is not valid`;
        if (props.reason && props.reason instanceof Error)
          errorMessage = props.reason.message;

        return errorMessage;
      }
    }
  }
  mongoose.createObjectId = function() {
    return new mongoose.mongo.ObjectId();
  }
}

module.exports = () => {return mongoose};
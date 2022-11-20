'use strict';

const winston = require('winston');
const { format } = winston;
const { combine, timestamp, label, printf } = format;
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    label({ label: 'syslog' }),
    timestamp(),
    printf(({ level, message, label, timestamp }) => {
      return `[${timestamp}] [${level}] [${label}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
});

const createLogger = function(name) {
  return winston.createLogger({
    level: 'info',
    format: combine(
      label({label: name}),
      timestamp(),
      printf(({ level, message, label, timestamp }) => {
        return `[${timestamp}] [${level}] [${label}] ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console()
    ]
  });
}


module.exports = {
  logger,
  createLogger
};

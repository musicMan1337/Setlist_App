import path from 'path';

import winston from 'winston';

import { NODE_ENV } from '../config';

const { format } = winston;

const fileFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.json()
);

const consoleFormat = format.combine(
  format.colorize({ colors: { info: 'blue' } }),
  format.timestamp({ format: 'HH:mm:ss' }),
  format.align(),
  format.printf((info) => `[${info.timestamp}] ❗${info.level}: ${info.message}`)
);

const logger = winston.createLogger();

const filename = path.resolve(__dirname, `logs/winston_logs.log`);

// disable for Heroku deployment
if (NODE_ENV === 'development') {
  logger.add(
    new winston.transports.File({
      filename,
      level: 'http',
      maxsize: 20000000, // 20MB
      tailable: true,
      zippedArchive: true,
      format: fileFormat
    })
  );
}

if (NODE_ENV === 'development') {
  logger.add(
    new winston.transports.Console({
      level: 'silly',
      format: consoleFormat
    })
  );
}

export default logger;

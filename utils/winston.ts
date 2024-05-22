import winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, json, errors } = winston.format;

const createTransport = (filename: string) => {
  return new winston.transports.DailyRotateFile({
    level: 'info',
    datePattern: 'YYYY-MM-DD',
    filename: `logs/%DATE%/${filename}-%DATE%.log`,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  });
};

const logger = winston.createLogger({
  exitOnError: false,
  level: 'info',
  format: combine(errors({ stack: true }), timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }), json()),
  transports: [createTransport('app-error')],
  exceptionHandlers: [createTransport('exception')],
  rejectionHandlers: [createTransport('rejections')],
});

export { logger };

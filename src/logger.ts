import winston from 'winston';
import newrelicFormatter from '@newrelic/winston-enricher';
import config from './config';

export default winston.createLogger({
  level: config.debugLogging ? 'debug' : 'info',
  format: config.isDevMode
    ? winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.simple()
    )
    : winston.format.combine(newrelicFormatter()),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console()
  ]
});

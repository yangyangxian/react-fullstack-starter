import winston from 'winston';
import config from '../config.js';

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${message}${stack ? `\n${stack}` : ''}`;
});

const logger = winston.createLogger({
  level: 'debug', // Default minimum level to log
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      level: config.envMode === 'development' ? 'debug' : 'info', // More verbose in dev
      format: combine(
        colorize(),
        logFormat
      )
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' })
  ]
});

// Add file transport only in production
if (config.envMode === 'production') {
  logger.add(new winston.transports.File({ filename: 'logs/error.log', level: 'error' }));
  logger.add(new winston.transports.File({ filename: 'logs/combined.log' }));
}

// Suppress console logs in test environment (winston automatically handles this via level)
if (config.envMode === 'test') {
  logger.silent = true;
  // Ensure errors are still logged to file if in production mode for tests
  // This is handled by the initial `if (config.env === 'production')` block
}

export default logger; 
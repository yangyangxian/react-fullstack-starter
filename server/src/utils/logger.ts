import winston, { Logger } from 'winston';
import config from '../config.js';
import { serverRootDir } from './path.js';
import path from 'path';

const { combine, timestamp, printf, colorize } = winston.format;

// Custom format that includes caller information with colors
const logFormat = printf(({ level, message, timestamp, stack, caller }) => {
  // Add purple color to caller information
  const callerInfo = caller ? `\x1b[35m[${caller}]\x1b[0m ` : '';
  return `${timestamp} ${level}: ${callerInfo}${message}${stack ? `\n${stack}` : ''}`;
});

// Console format with colors (for development)
const consoleFormat = printf(({ level, message, timestamp, stack, caller }) => {
  // Bright purple/magenta color for caller info in console
  const callerInfo = caller ? `\x1b[95m[${caller}]\x1b[0m ` : '';
  return `${timestamp} ${level}: ${callerInfo}${message}${stack ? `\n${stack}` : ''}`;
});

// Simplified function to get caller information from stack trace
const getCallerInfo = () => {
  try {
    const stack = new Error().stack?.split('\n');
    if (!stack) return null;
    
    // Find first line that doesn't contain 'logger' 
    const callerLine = stack.find(line => 
      line.includes(' at ') && 
      !line.includes('logger') && 
      !line.includes('getCallerInfo')
    );
    
    if (!callerLine) return null;
    
    // Extract filename:line from stack trace (handles both formats)
    const match = callerLine.match(/([^/\\]+):(\d+):\d+/);
    if (match) {
      const filename = path.basename(match[1]); // Keep the full filename with extension
      return `${filename}:${match[2]}`;
    }
  } catch (e) {
    // Silent fail
  }
  return null;
};

// Enhanced logger that automatically includes caller info
const createLoggerWithCaller = (baseLogger: Logger) => {
  // Generic wrapper function that adds caller info to any log level
  const wrapLogMethod = (method: string) => (message: string | object, meta?: any) => {
    const caller = getCallerInfo();
    
    // Handle both string messages and object logging
    if (typeof message === 'object') {
      // If message is an object, log it as metadata
      (baseLogger as any)[method]('', { caller, ...message, ...meta });
    } else {
      // If message is a string, log normally
      (baseLogger as any)[method](message, { caller, ...meta });
    }
  };

  // Return object with all log levels using the same wrapper logic
  return {
    error: wrapLogMethod('error'),
    warn: wrapLogMethod('warn'),
    info: wrapLogMethod('info'),
    debug: wrapLogMethod('debug'),
    verbose: wrapLogMethod('verbose')
  };
};

const baseLogger : Logger = winston.createLogger({
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
        consoleFormat // Use the colored format for console
      )
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: `${serverRootDir}/logs/exceptions.log` })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: `${serverRootDir}/logs/rejections.log` })
  ]
});

// Add file transport only in production
if (config.envMode === 'production') {
  baseLogger.add(new winston.transports.File({ filename: `${serverRootDir}/logs/error.log`, level: 'error' }));
  baseLogger.add(new winston.transports.File({ filename: `${serverRootDir}/logs/combined.log` }));
}

// Suppress console logs in test environment (winston automatically handles this via level)
if (config.envMode === 'test') {
  baseLogger.silent = true;
  // Ensure errors are still logged to file if in production mode for tests
  // This is handled by the initial `if (config.env === 'production')` block
}

// Export the enhanced logger with caller information
const logger = createLoggerWithCaller(baseLogger);

export default logger;
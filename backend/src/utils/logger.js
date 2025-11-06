// ========================================
// LOGGER UTILITY
// ========================================
// Winston logger for better logging than console.log
// Logs to both console and files

const winston = require('winston');

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),  // Include stack traces
  winston.format.splat(),  // String interpolation
  winston.format.json()    // Store as JSON
);

// Console format (pretty, colored output)
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    
    // If there's additional data, show it
    if (Object.keys(meta).length > 0) {
      msg += ` ${JSON.stringify(meta)}`;
    }
    
    return msg;
  })
);

// Create logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: logFormat,
  
  // Where to write logs
  transports: [
    // Write all logs to console
    new winston.transports.Console({
      format: consoleFormat
    }),
    
    // Write errors to error.log file
    // new winston.transports.File({ 
    //   filename: 'logs/error.log', 
    //   level: 'error' 
    // }),
    
    // Write all logs to combined.log
    // new winston.transports.File({ 
    //   filename: 'logs/combined.log' 
    // })
  ]
});

// USAGE:
// logger.info('Server started');
// logger.error('Database connection failed', { error: err });
// logger.debug('User data:', { user });

module.exports = logger;

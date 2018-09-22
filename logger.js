const winston = require('winston');
const config = require('./config');

/*
Used default logging levels, which is syslog levels:
Note: Logging function names are corresponding logging level names and
      logging levels are prioritized from 0 to 5 (highest to lowest)

    levels: { 
        error:   0, 
        warn:    1, 
        info:    2, 
        verbose: 3, 
        debug:   4, 
        silly:   5 
    }
*/

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: config.logLevel, // logs up to specified level
      timestamp: false,
      colorize: true
    })
  ]
});

module.exports = {
  error:   function (message) { logger.error(message); },
  warn:    function (message) { logger.warn(message); },
  info:    function (message) { logger.info(message); },
  verbose: function (message) { logger.verbose(message); },
  debug:   function (message) { logger.debug(message); },
  silly:   function (message) { logger.silly(message); }
};

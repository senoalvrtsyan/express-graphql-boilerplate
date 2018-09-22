'use strict';

const { NODE_ENV, PORT } = process.env;
const nodeEnv = (NODE_ENV !== undefined ? NODE_ENV : 'development');

module.exports = {
  nodeEnv,
  logLevel: nodeEnv === 'development' ? 'debug' : 'info',
  port: PORT || 8080
};

'use strict';

/**
 * Module Dependencies
 */

const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const graphqlHttp = require('express-graphql');
const expressJwt = require('express-jwt');
const config = require('./config');
const log = require('./logger');
const { graphqlSchema } = require('./graphqlSchema');
const pckg = require('./package');

/**
 * Other Middleware
 */
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    if (req.headers['access-control-request-headers']) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      res.header('Access-Control-Allow-Credentials', 'true');
    }
    return res.end();
  }
  next();
});

/**
 * Setup JWT based token protection on all GraphQL ednpoints
 * NOTE: Must be used before GraphQL route setup
 */

app.use(expressJwt({
  secret: config.tokenSecret
}).unless({path: ['/']}));

/**
 * Setup GraphQL route
 */

app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  graphiql: true // Set this to false if you don't want graphiql in browser env
}));

/**
 * Root endpoint
 */

app.get('/', (req, res) => {
  res.send(`Greetings from ${pckg.name}`);
});

/**
 * Middleware For Not Found
 */

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Unauthorized error handler
 */

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    log.error(err.message);
    res.status(401).send(JSON.stringify({error: err.name}));
  } else {
    next(err);
  }
});

/**
 * Production error handler
 */

app.use((err, req, res) => {
  log.error(err.message);
  res.status(err.status || 500);
  res.json({message: err.message, error: err});
});

/**
 * Application listening on PORT
 */

app.listen(config.port, () => {
  log.info(`Running in '${config.nodeEnv}' environment`);
  log.info(`Listening on port: ${config.port}`);
});

/**
 * Checking Uncaught Exceptions
 */

process.on('uncaughtException', err => {
  log.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
  log.info(err.stack);
  process.exit(1);
});

/**
 * Checking Unhandled Rejection
 */

process.on('unhandledRejection', err => {
  log.error((new Date()).toUTCString() + ' unhandledRejection:', err.message);
  log.info(err.stack);
  process.exit(1);
});

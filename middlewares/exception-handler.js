const { get, pick } = require('lodash');
const HttpStatus = require('http-status-codes');
const Config = require('../utilities/config');
const cmn = require('../utilities/common');
const { API_ENV } = require('../constants/info-constants');
const LoggerService = require('../utilities/logger');

const logger = new LoggerService('exception-handler');

/**
 * Intercepts the exceptions and logs them if required
 * @param err
 * @param req
 * @param res
 * @param next
 * @return {module.exports}
 * @constructor
 */
const ExceptionHandlerMiddleware = (err, req, res, next) => {
  // Continue if it is not an error
  if (!(err instanceof Error)) {
    return next();
  }

  const additionalData = {
    code: err.code,
    httpStatus: err.status || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
    requestUrl: req.originalUrl,
    payload: pick(req, ['params', 'query', 'body']),
    message:  get(err, 'errors.0.message') || get(err, 'message') || 'internal server error',
  };

  // send stack trace only when not in production
  const notProduction = Config.get('API_ENV') !== API_ENV.LIVE;
  const formattedResponse = {
    ...additionalData,
    ...(notProduction && { stack: `Meal Planner API – ${JSON.stringify(err, cmn.replaceErrors)}` }),
  };

  // log error
  logger.error('Error handled in middleware', { error: err, additionalData });
  return res.status(additionalData.httpStatus).json(formattedResponse);
};

module.exports = ExceptionHandlerMiddleware;

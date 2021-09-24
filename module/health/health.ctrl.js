const HttpStatus = require('http-status-codes');
const LoggerService = require('../../utilities/logger');

const logger = new LoggerService('health.ctrl');

/**
 *
 * @param req
 * @param res
 */
const checkHealth = (req, res) => {
  logger.info('Health Status Checked')
  res.status(HttpStatus.OK).json({
    ok: 'ok',
  });
};


module.exports = { checkHealth };

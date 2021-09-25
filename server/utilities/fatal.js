const LoggerService = require('./logger');
const logger = new LoggerService('utilities.fatal');

/**
 * Makes sure that the process doesn't shut down
 * for any uncaught errors – and logs them to
 * for easier debugging.
 */
const handleUncaughtErrors = () => {
  process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Rejection', { error: err });
  });

  process.on('uncaughtException', (err) => {
    logger.error('Unhandled Exception', { error: err });
  });
};

const disconnectGracefully = () => {
  process.exit(0);
};

const handleExit = () => {
  // If the Node process ends, close the connection gracefully
  process.on('SIGINT', disconnectGracefully);

  process.on('exit', disconnectGracefully);
};

module.exports = {
  handleUncaughtErrors,
  handleExit,
};

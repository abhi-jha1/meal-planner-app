const http = require('http');
const config = require('./utilities/config');
const db = require('./models');
const { handleExit, handleUncaughtErrors } = require('./utilities/fatal');
const LoggerService = require('./utilities/logger');

const logger = new LoggerService('index');

const app = require('./app');

function start() {
  try {
    handleUncaughtErrors();
    handleExit();

    const APP_PORT = config.get('NODE_PORT', 3010);
    app.server = http.createServer(app);
    app
      .server
      .listen(APP_PORT, () => {
        logger.info(`Meal Planner System : listening on port:${APP_PORT}`);
        db.sequelize.sync();
        logger.info(`Meal Planner System : DB SYNCED`);
      });
  } catch (err) {
    logger.error('Meal Planner System : server start failed', { error: err });
    process.exit(1);
  }
}

start();
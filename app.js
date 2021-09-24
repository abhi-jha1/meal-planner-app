require('express-async-errors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');

// swagger
const swaggerDocument = require('./swagger.json');

// routes
const healthRoutes = require('./module/health/health.route');
const authRoutes = require('./module/auth/auth.route');
const mealRoutes = require('./module/meal/meal.route');

// middle-wares
const HandleCors = require('./middlewares/handle-cors');
const Morgan = require('./middlewares/morgan-logger');
const StatusMonitor = require('./middlewares/status-monitor');
const ApiRateLimiter = require('./middlewares/api-rate-limit');
const CompressResponseMiddleware = require('./middlewares/compression');
const ExceptionHandlerMiddleware = require('./middlewares/exception-handler');
const RouteNotFoundMiddleware = require('./middlewares/not-found');

const app = express();

app
  .use(HandleCors)
  .use(Morgan) // for logging
  .use(express.json())
  .use(StatusMonitor)
  .use('/api/', ApiRateLimiter)
  .use(CompressResponseMiddleware)
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // swagger ui
  .use('/api', healthRoutes)
  .use('/api', authRoutes)
  .use('/api', mealRoutes)
  .use(ExceptionHandlerMiddleware)
  .use(RouteNotFoundMiddleware); // 404 route not found lastly

module.exports = app;

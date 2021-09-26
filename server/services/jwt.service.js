const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const Config = require('../utilities/config');
const { getUser } = require('./user.service');

const ACCESS_TOKEN_SECRET = Config.get('ACCESS_TOKEN_SECRET');
const ACCESS_TOKEN_VALIDITY = Config.get('ACCESS_TOKEN_VALIDITY');
const TOKEN_ISSUER = Config.get('TOKEN_ISSUER');

module.exports = {
  signAccessToken: (user) => new Promise((resolve, reject) => {
    const payload = {
      ...user, password: null,
    };
    const options = {
      expiresIn: ACCESS_TOKEN_VALIDITY,
      issuer: TOKEN_ISSUER,
      audience: String(user.id),
    };
    JWT.sign(payload, ACCESS_TOKEN_SECRET, options, (err, token) => {
      if (err) {
        console.error('jwt >> signAccessToken >> ', err);
        return reject(createError.InternalServerError());
      }
      resolve(token);
    });
  }),

  /**
   * Also used as middleware to establish authentication
   */
  verifyAccessToken: (req, _, next) => {
    console.log(req.headers.authorization,'headers')
    if (!req.headers.authorization) {
      return next(createError.Unauthorized());
    }
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    JWT.verify(token, ACCESS_TOKEN_SECRET, async (err, payload) => {
      if (err) {
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        return next(createError.Unauthorized(message));
      }
      req.userId = payload.aud;
      const user = await getUser(req.userId);
      if (!user) {
        return next(createError.Unauthorized('resource gone'));
      }
      req.user = user;
      next();
    });
  },
};

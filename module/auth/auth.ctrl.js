const HttpStatus = require('http-status-codes');
const { loginUser, signUpUser } = require('../../services/auth.service');

/**
 *
 * @param req
 * @param res
 */
const login = async (req, res) => {
  const resp = await loginUser(req.body);
  res.status(HttpStatus.StatusCodes.OK).json(resp);
};

/**
 *
 * @param req
 * @param res
 */
 const signup = async (req, res) => {
  const resp = await signUpUser(req.body);
  res.status(HttpStatus.StatusCodes.OK).json(resp);
};

module.exports = { login, signup };

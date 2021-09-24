const { omit, pick } = require('lodash');
const jwt = require('./jwt.service');
const userService = require('./user.service');

const signUpUser = async (doc) => {
  const user = await userService.createUser(pick(doc, ['username', 'email', 'password']));
  const token = await jwt.signAccessToken(user);
  return omit({ token, ...user }, 'password');
}

const loginUser = async ({ email, password }) => {
  const user = await userService.validatePassword(email, password);
  const token = await jwt.signAccessToken(user);
  return omit({ token, ...user }, 'password');
};

module.exports = {
  signUpUser, loginUser,
};

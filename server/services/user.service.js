const createError = require('http-errors');
const bcrypt = require('bcrypt');
const Config = require('../utilities/config');
const { User } = require('../models');

/**
 * creates a user entry to database
 * @param data
 * @returns {Promise<document>}
 */
const createUser = async (user) => {
  const hash = await bcrypt.hash(user.password, Config.get('BCRYPT_SALT_FACTOR', 10));
  const response = await User.create({ ...user, password: hash });
  return response.get({ plain: true })
};

/**
 * validates password for a given user
 * @param data
 * @returns {user}
 */
const validatePassword = async (email, password) => {
  const user = await User.findOne({ where: { email } , raw: true });
  if (!user) {
    throw createError.BadRequest('email not found');
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw createError.BadRequest('password does not match');
  }
  return user;
};


/**
 * get user
 * @param params
 * @returns {User}
 */
const getUser = async (id) => {
  return User.findOne({ where: { id }, raw: true });
};

module.exports = {
  createUser, validatePassword, getUser,
};

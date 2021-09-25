const get = require('lodash/get');
const loadedConfig = require('../config/app.config.json');

class config {
  /**
   * Read the configuration from the app config file, checks in env variable first
   *
   * @example  config.get('JWT_SECRET_KEY', 'jwt_secret_key');
   *
   * @param {string} targetConfig
   * @param {*} defaultValue
   * @returns {*}
   */

  static get(targetConfig, defaultValue) {
    const envVariable = get(process.env, targetConfig);

    /**
     * if it's in env
     */
    if (envVariable !== undefined) {
      return envVariable;
    }

    return loadedConfig[targetConfig] || defaultValue;
  }
}

module.exports = config;

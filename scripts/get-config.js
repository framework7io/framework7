/* eslint import/no-unresolved: "off" */
/* eslint global-require: "off" */
/* eslint no-console: ["error", { allow: ["log"] }] */

const path = require('path');
let config = require('./build-config.js');

// Overwrite with local config
try {
  const customConfig = require('./build-config-custom.js');
  config = Object.assign({}, config, customConfig);
} catch (err) {
  // No local config
}

let logged = false;

function getConfig() {
  const args = process.argv;
  if (args[3] && args[3].indexOf('--config') === 0 && args[4]) {
    const configPath = path.resolve(args[4]);
    const overwriteConfig = require(configPath); // eslint-disable-line
    config = Object.assign({}, config, overwriteConfig);
    if (!logged) {
      console.log(`Building using custom config from ${configPath}`);
    }
    logged = true;
  }
  return config;
}

module.exports = getConfig;

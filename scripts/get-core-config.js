/* eslint global-require: "off" */
/* eslint no-console: ["error", { allow: ["log"] }] */

const path = require('path');
let config = require('./build-config.js');

// Overwrite with local config
try {
  // eslint-disable-next-line
  const customConfig = require('./build-config-custom.js');
  config = Object.assign({}, config, customConfig);
} catch (err) {
  // No local config
}

let logged = false;

function getConfig() {
  const args = process.argv;
  let configArgIndex;
  let configPath;
  args.forEach((arg, argIndex) => {
    if (arg === '--config') configArgIndex = argIndex;
  });
  if (configArgIndex && args[configArgIndex + 1]) {
    configPath = path.resolve(args[configArgIndex + 1]);
  }
  if (configPath) {
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

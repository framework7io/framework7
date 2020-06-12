/* eslint global-require: "off" */
/* eslint no-console: ["error", { allow: ["log"] }] */

const path = require('path');

let logged = false;

function getOutput() {
  const env = process.env.NODE_ENV || 'development';
  const args = process.argv;
  let outputArgIndex;
  let outputPath = path.resolve(__dirname, env === 'production' ? '../packages' : '../build');
  let needToLog;
  args.forEach((arg, argIndex) => {
    if (arg === '--output') outputArgIndex = argIndex;
  });
  if (outputArgIndex && args[outputArgIndex + 1]) {
    needToLog = true;
    outputPath = path.resolve(args[outputArgIndex + 1]);
  }
  if (outputPath && needToLog) {
    if (!logged) {
      console.log(`Build will be available at ${outputPath}`);
    }
    logged = true;
  }
  return outputPath;
}

module.exports = getOutput;

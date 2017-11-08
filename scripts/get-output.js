/* eslint import/no-unresolved: "off" */
/* eslint global-require: "off" */
/* eslint no-console: ["error", { allow: ["log"] }] */

const path = require('path');

let logged = false;

function getOutput() {
  const args = process.argv;
  let outputArgIndex;
  let outputPath;
  args.forEach((arg, argIndex) => {
    if (arg === '--output') outputArgIndex = argIndex;
  });
  if (outputArgIndex && args[outputArgIndex + 1]) {
    outputPath = path.resolve(args[outputArgIndex + 1]);
  }
  if (outputPath) {
    if (!logged) {
      console.log(`Build will be available at ${outputPath}`);
    }
    logged = true;
  }
  return outputPath;
}

module.exports = getOutput;

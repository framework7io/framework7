/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const CleanCSS = require('clean-css');

module.exports = (content, options) => {
  if (!options) {
    // eslint-disable-next-line
    options = {
      compatibility: '*,-properties.zeroUnits',
    };
  }
  return new Promise((resolve, reject) => {
    if (content instanceof Promise) {
      content.then((c) => {
        const minified = new CleanCSS(options).minify(c);
        resolve(minified);
      }).catch((err) => {
        reject(err);
        throw err;
      });
      return;
    }
    const minified = new CleanCSS(options).minify(content);
    resolve(minified.styles);
  });
};

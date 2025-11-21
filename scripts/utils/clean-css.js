/* eslint import/no-extraneous-dependencies: "off" */
const postcss = require('postcss');
const cssnano = require('cssnano');

module.exports = (content, options = {}) => {
  // eslint-disable-next-line
  options = Object.assign(
    {
      compatibility: '*,-properties.zeroUnits',
    },
    options,
  );

  return new Promise((resolve, reject) => {
    if (content instanceof Promise) {
      content
        .then((c) => {
          postcss([cssnano()])
            .process(c, { from: undefined, to: undefined })
            .then((result) => resolve(result.css));
        })
        .catch((err) => {
          reject(err);
          throw err;
        });
      return;
    }
    postcss([cssnano()])
      .process(content, { from: undefined, to: undefined })
      .then((res) => {
        resolve(res.css);
      });
  });
};

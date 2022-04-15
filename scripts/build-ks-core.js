const path = require('path');
const fs = require('./utils/fs-extra.js');

function buildKs(cb) {
  const env = process.env.NODE_ENV || 'development';
  let index = fs.readFileSync(path.resolve(__dirname, '../kitchen-sink/core/index.html'));
  if (env === 'development') {
    index = index
      .replace(
        '../../packages/core/framework7-bundle.min.css',
        '../../build/core/framework7-bundle.css',
      )
      .replace(
        '../../packages/core/framework7-bundle.min.js',
        '../../build/core/framework7-bundle.js',
      );
  } else {
    index = index
      .replace(
        '../../build/core/framework7-bundle.css',
        '../../packages/core/framework7-bundle.min.css',
      )
      .replace(
        '../../build/core/framework7-bundle.js',
        '../../packages/core/framework7-bundle.min.js',
      );
  }
  fs.writeFileSync(path.resolve(__dirname, '../kitchen-sink/core/index.html'), index);
  cb();
}

module.exports = buildKs;

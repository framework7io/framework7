const path = require('path');
const fs = require('./utils/fs-extra');

function buildKs(cb) {
  const env = process.env.NODE_ENV || 'development';
  let index = fs.readFileSync(path.resolve(__dirname, '../kitchen-sink/core/index.html'));
  if (env === 'development') {
    index = index
      .replace('../../packages/core/css/framework7.bundle.min.css', '../../build/core/css/framework7.bundle.css')
      .replace('../../packages/core/js/framework7.bundle.min.js', '../../build/core/js/framework7.bundle.js');
  } else {
    index = index
      .replace('../../build/core/css/framework7.bundle.css', '../../packages/core/css/framework7.bundle.min.css')
      .replace('../../build/core/js/framework7.bundle.js', '../../packages/core/js/framework7.bundle.min.js');
  }
  fs.writeFileSync(path.resolve(__dirname, '../kitchen-sink/core/index.html'), index);
  cb();
}

module.exports = buildKs;

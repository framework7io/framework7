/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const gulp = require('gulp');
const modifyFile = require('gulp-modify-file');

function buildKs(cb) {
  const env = process.env.NODE_ENV || 'development';
  gulp.src('./kitchen-sink/core/index.html')
    .pipe(modifyFile((content) => {
      if (env === 'development') {
        return content
          .replace('../../packages/core/css/framework7.min.css', '../../build/core/css/framework7.css')
          .replace('../../packages/core/js/framework7.min.js', '../../build/core/js/framework7.js');
      }
      return content
        .replace('../../build/core/css/framework7.css', '../../packages/core/css/framework7.min.css')
        .replace('../../build/core/js/framework7.js', '../../packages/core/js/framework7.min.js');
    }))
    .pipe(gulp.dest('./kitchen-sink/core'))
    .on('end', () => {
      if (cb) cb();
    });
}

module.exports = buildKs;

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const gulp = require('gulp');
const modifyFile = require('gulp-modify-file');

function buildKs(cb) {
  const env = process.env.NODE_ENV || 'development';
  gulp.src('./kitchen-sink/index.html')
    .pipe(modifyFile((content) => {
      if (env === 'development') {
        return content
          .replace('../dist/css/framework7.min.css', '../build/css/framework7.css')
          .replace('../dist/js/framework7.min.js', '../build/js/framework7.js');
      }
      return content
        .replace('../build/css/framework7.css', '../dist/css/framework7.min.css')
        .replace('../build/js/framework7.js', '../dist/js/framework7.min.js');
    }))
    .pipe(gulp.dest('./kitchen-sink/'))
    .on('end', () => {
      if (cb) cb();
    });
}

module.exports = buildKs;

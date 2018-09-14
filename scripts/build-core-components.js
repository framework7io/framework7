/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const gulp = require('gulp');
const modifyFile = require('gulp-modify-file');
const getConfig = require('./get-core-config.js');
const getOutput = require('./get-core-output.js');

function build(cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || config.target || 'universal';
  const format = 'es';
  const output = getOutput();

  gulp.src(['./src/core/**/*.*', '!./src/core/framework7.less', '!./src/core/framework7.js', '!./src/core/framework7.d.ts'])
    .pipe(modifyFile((content) => {
      const newContent = content
        .replace('process.env.NODE_ENV', JSON.stringify(env))
        .replace('process.env.TARGET', JSON.stringify(target))
        .replace('process.env.FORMAT', JSON.stringify(format));
      return newContent;
    }))
    .pipe(gulp.dest(output))
    .on('end', () => {
      cb();
    });
}

module.exports = build;

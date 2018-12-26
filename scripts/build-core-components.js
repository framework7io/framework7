/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */
const fs = require('fs');
const gulp = require('gulp');
const modifyFile = require('gulp-modify-file');
const getConfig = require('./get-core-config.js');
const getOutput = require('./get-output.js');

function base64Encode(file) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString('base64');
}

function build(cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || config.target || 'universal';
  const format = 'es';
  const output = `${getOutput()}/core`;

  gulp.src(['./src/core/**/*.*', '!./src/core/framework7.less', '!./src/core/framework7.js', '!./src/core/framework7.d.ts', '!./src/core/icons/**/**.*'])
    .pipe(modifyFile((content) => {
      const newContent = content
        .replace('process.env.NODE_ENV', JSON.stringify(env))
        .replace('process.env.TARGET', JSON.stringify(target))
        .replace('process.env.FORMAT', JSON.stringify(format));
      return newContent;
    }))
    .pipe(gulp.dest(output))
    .on('end', () => {
      const iconsFontBase64 = base64Encode('./src/core/icons/font/framework7-core-icons.woff');
      const skeletonFontBase64 = base64Encode('./src/core/icons/font/framework7-skeleton.woff');
      const appLess = fs.readFileSync(`${output}/components/app/app.less`, 'utf-8')
        .replace('framework7_coreIconsFont()', `'${iconsFontBase64}'`)
        .replace('framework7_skeletonFont()', `'${skeletonFontBase64}'`);
      fs.writeFileSync(`${output}/components/app/app.less`, appLess);
      cb();
    });
}

module.exports = build;

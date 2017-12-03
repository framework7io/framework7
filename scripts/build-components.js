/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint import/no-unresolved: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const gulp = require('gulp');
const getConfig = require('./get-config.js');
const banner = require('./banner.js');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const getOutput = require('./get-output.js');
const modifyFile = require('gulp-modify-file');

function build(cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || config.target || 'universal';
  const format = 'es';
  const output = getOutput();

  // LESS vars
  const colorsIos = Object.keys(config.ios.colors).map(colorName => `${colorName} ${config.ios.colors[colorName]}`).join(', ');
  const colorsMd = Object.keys(config.md.colors).map(colorName => `${colorName} ${config.md.colors[colorName]}`).join(', ');
  const includeIosTheme = config.themes.indexOf('ios') >= 0;
  const includeMdTheme = config.themes.indexOf('md') >= 0;
  const includeDarkTheme = config.darkTheme;
  const rtl = config.rtl;

  gulp.src('./src/**/*.*')
    .pipe(modifyFile((content, file) => {
      let newContent = content
        .replace('process.env.NODE_ENV', JSON.stringify(env))
        .replace('process.env.TARGET', JSON.stringify(target))
        .replace('process.env.FORMAT', JSON.stringify(format))
        .replace('//IMPORT_COMPONENTS\n', '')
        .replace('//INSTALL_COMPONENTS\n', '');
      if (file.indexOf('src/framework7.js') >= 0 || file.indexOf('src/framework7.less') >= 0) {
        newContent = `${banner}\n${newContent}`;
      }
      if (file.indexOf('src/framework7.less')) {
        newContent = newContent
          .replace('$includeIosTheme', includeIosTheme)
          .replace('$includeMdTheme', includeMdTheme)
          .replace('$includeDarkTheme', includeDarkTheme)
          .replace('$themeColorIos', config.ios.themeColor)
          .replace('$colorsIos', colorsIos)
          .replace('$themeColorMd', config.md.themeColor)
          .replace('$colorsMd', colorsMd)
          .replace('$rtl', rtl);
      }
      return newContent;
    }))
    .pipe(gulpif(
      file => file.path.indexOf('src/framework7.js') >= 0,
      rename((file) => { file.basename += '.esm'; })
    ))
    .pipe(gulp.dest(output || (env === 'development' ? './build/' : './dist/')))
    .on('end', () => {
      cb();
    });
}

module.exports = build;

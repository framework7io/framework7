/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */

const gulp = require('gulp');
const fs = require('fs');
const modifyFile = require('gulp-modify-file');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const header = require('gulp-header');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

const config = require('./config.js');
const banner = require('./banner.js');

function build(cb, buildTheme) {
  const env = process.env.NODE_ENV || 'development';

  const components = [];
  config.components.forEach((name) => {
    const lessFilePath = `./src/components/${name}/${name}.less`;
    if (fs.existsSync(lessFilePath)) {
      components.push(name);
    }
  });

  const themes = buildTheme ? [buildTheme] : config.themes;

  gulp.src('./src/framework7.less')
    .pipe(modifyFile((content) => {
      const newContent = content
        .replace('//IMPORT_COMPONENTS', components.map(component => `@import url('./components/${component}/${component}.less');`).join('\n'))
        .replace(/@include-ios-theme: (true|false);/, `@include-ios-theme: ${themes.indexOf('ios') >= 0 ? 'true' : 'false'};`)
        .replace(/@include-md-theme: (true|false);/, `@include-md-theme: ${themes.indexOf('md') >= 0 ? 'true' : 'false'};`);
      return newContent;
    }))
    .pipe(less())
    .on('error', (err) => {
      if (cb) cb();
      console.log(err.toString());
    })
    .pipe(autoprefixer({
      cascade: false,
    }))
    .on('error', (err) => {
      if (cb) cb();
      console.log(err.toString());
    })
    .pipe(header(banner))
    .pipe(rename((filePath) => {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      filePath.basename = buildTheme ? `framework7.${buildTheme}` : 'framework7';
    }))
    .pipe(gulp.dest(`./${env === 'development' ? 'build' : 'dist'}/css/`))
    .on('end', () => {
      if (env === 'development') {
        if (cb) cb();
        return;
      }
      gulp.src(`./dist/css/${buildTheme ? `framework7.${buildTheme}` : 'framework7'}.css`)
        .pipe(cleanCSS({
          advanced: false,
          aggressiveMerging: false,
        }))
        .pipe(header(banner))
        .pipe(rename((filePath) => {
          /* eslint no-param-reassign: ["error", { "props": false }] */
          filePath.basename += '.min';
        }))
        .pipe(gulp.dest('./dist/css/'))
        .on('end', () => {
          if (buildTheme && cb) {
            cb();
            return;
          }
          let cbs = 0;
          const expectCbs = themes.length;
          themes.forEach((theme) => {
            build(() => {
              cbs += 1;
              if (cbs === expectCbs && cb) cb();
            }, theme);
            build(() => {
              cbs += 1;
              if (cbs === expectCbs && cb) cb();
            }, theme);
          });
        });
    });
}

module.exports = build;

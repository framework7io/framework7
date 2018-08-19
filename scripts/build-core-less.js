/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const gulp = require('gulp');
const fs = require('fs');
const modifyFile = require('gulp-modify-file');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const header = require('gulp-header');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const LessLists = require('less-plugin-lists');
const getConfig = require('./get-core-config.js');
const getOutput = require('./get-core-output.js');
const banner = require('./banner-core.js');

function base64Encode(file) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString('base64');
}

// Copy LESS
function copyLess(config, cb) {
  const output = getOutput();
  const colors = Object.keys(config.colors).map(colorName => `${colorName} ${config.colors[colorName]}`).join(', ');
  const includeIosTheme = config.themes.indexOf('ios') >= 0;
  const includeMdTheme = config.themes.indexOf('md') >= 0;
  const includeDarkTheme = config.darkTheme;
  const rtl = config.rtl;
  const iconsFontBase64 = base64Encode('src/core/icons/font/Framework7CoreIcons.woff2');

  gulp.src(['src/core/framework7.less'])
    .pipe(modifyFile((content) => {
      let newContent = content;
      newContent = `${banner}\n${newContent}`;
      newContent = newContent
        .replace('$iconsFontBase64', iconsFontBase64)
        .replace('$includeIosTheme', includeIosTheme)
        .replace('$includeMdTheme', includeMdTheme)
        .replace('$includeDarkTheme', includeDarkTheme)
        .replace('$colors', colors)
        .replace('$themeColor', config.themeColor)
        .replace('$rtl', rtl);
      return newContent;
    }))
    .pipe(gulp.dest(output))
    .on('end', () => {
      if (cb) cb();
    });
}
// Build CSS
function build(config, components, themes, rtl, cb) {
  const env = process.env.NODE_ENV || 'development';
  const colors = Object.keys(config.colors).map(colorName => `${colorName} ${config.colors[colorName]}`).join(', ');
  const includeIosTheme = themes.indexOf('ios') >= 0;
  const includeMdTheme = themes.indexOf('md') >= 0;
  const includeDarkTheme = config.darkTheme;
  const currentTheme = themes.length === 1 ? themes[0] : '';
  const outputFileName = `framework7${rtl ? '.rtl' : ''}${currentTheme ? `.${currentTheme}` : ''}`;
  const output = getOutput();
  const iconsFontBase64 = base64Encode('src/core/icons/font/Framework7CoreIcons.woff2');

  gulp.src('./src/core/framework7.less')
    .pipe(modifyFile((content) => {
      const newContent = content
        .replace('//IMPORT_COMPONENTS', components.map(component => `@import url('./components/${component}/${component}.less');`).join('\n'))
        .replace('$iconsFontBase64', iconsFontBase64)
        .replace('$includeIosTheme', includeIosTheme)
        .replace('$includeMdTheme', includeMdTheme)
        .replace('$includeDarkTheme', includeDarkTheme)
        .replace('$colors', colors)
        .replace('$themeColor', config.themeColor)
        .replace('$rtl', rtl);
      return newContent;
    }))
    .pipe(less({
      plugins: [new LessLists()],
    }))
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
      filePath.basename = outputFileName;
    }))
    .pipe(gulp.dest(`${output}/css/`))
    .on('end', () => {
      if (env === 'development') {
        if (cb) cb();
        return;
      }
      gulp.src(`${output}/css/${outputFileName}.css`)
        .pipe(cleanCSS({
          compatibility: '*,-properties.zeroUnits',
        }))
        .pipe(header(banner))
        .pipe(rename((filePath) => {
          filePath.basename += '.min';
        }))
        .pipe(gulp.dest(`${output}/css/`))
        .on('end', () => {
          if (cb) cb();
        });
    });
}


function buildLess(cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';

  const components = [];
  config.components.forEach((name) => {
    const lessFilePath = `./src/core/components/${name}/${name}.less`;
    if (fs.existsSync(lessFilePath)) {
      components.push(name);
    }
  });

  // Copy Less
  copyLess(config);

  // Build development version
  if (env === 'development') {
    build(config, components, config.themes, config.rtl, () => {
      if (cb) cb();
    });
    return;
  }

  // Build multiple files
  let cbs = 0;
  function onCb() {
    cbs += 1;
    if (cbs === 6 && cb) cb();
  }

  // Build Bundle
  build(config, components, ['ios', 'md'], false, onCb);
  build(config, components, ['ios', 'md'], true, onCb);
  // Build Themes
  build(config, components, ['ios'], false, onCb);
  build(config, components, ['ios'], true, onCb);
  build(config, components, ['md'], false, onCb);
  build(config, components, ['md'], true, onCb);
}

module.exports = buildLess;

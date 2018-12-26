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
const getConfig = require('./get-core-config.js');
const getOutput = require('./get-output.js');
const banner = require('./banner-core.js');

// Copy LESS
function copyLess(config, components, cb) {
  const output = `${getOutput()}/core`;
  const colors = `{\n${Object.keys(config.colors).map(colorName => `  ${colorName}: ${config.colors[colorName]};`).join('\n')}\n}`;
  const includeIosTheme = config.themes.indexOf('ios') >= 0;
  const includeMdTheme = config.themes.indexOf('md') >= 0;
  const includeDarkTheme = config.darkTheme;
  const rtl = config.rtl;

  gulp.src(['src/core/framework7.less'])
    .pipe(modifyFile((content) => {
      let newContent = content;
      newContent = `${banner}\n${newContent}`;
      newContent = newContent
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
      gulp.src([`${output}/framework7.less`])
        // eslint-disable-next-line
        .pipe(modifyFile((content) => {
          return content
            .replace('//IMPORT_COMPONENTS', components.map(component => `@import url('./components/${component}/${component}.less');`).join('\n'));
        }))
        .pipe(rename((filePath) => {
          filePath.basename = 'framework7.bundle';
        }))
        .pipe(gulp.dest(output))
        .on('end', () => {
          if (cb) cb();
        });
    });
}
// Build CSS
function buildBundle(config, components, themes, rtl, cb) {
  const env = process.env.NODE_ENV || 'development';
  const colors = `{\n${Object.keys(config.colors).map(colorName => `  ${colorName}: ${config.colors[colorName]};`).join('\n')}\n}`;
  const includeIosTheme = themes.indexOf('ios') >= 0;
  const includeMdTheme = themes.indexOf('md') >= 0;
  const includeDarkTheme = config.darkTheme;
  const outputFileName = `framework7.bundle${rtl ? '.rtl' : ''}`;
  const output = `${getOutput()}/core`;

  gulp.src('./src/core/framework7.less')
    .pipe(modifyFile((content) => {
      const newContent = content
        .replace('//IMPORT_COMPONENTS', components.map(component => `@import url('./components/${component}/${component}.less');`).join('\n'))
        .replace('$includeIosTheme', includeIosTheme)
        .replace('$includeMdTheme', includeMdTheme)
        .replace('$includeDarkTheme', includeDarkTheme)
        .replace('$colors', colors)
        .replace('$themeColor', config.themeColor)
        .replace('$rtl', rtl);
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
function buildCore(themes, rtl, cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const includeIosTheme = themes.indexOf('ios') >= 0;
  const includeMdTheme = themes.indexOf('md') >= 0;
  const includeDarkTheme = config.darkTheme;
  const output = `${getOutput()}/core`;
  const colors = `{\n${Object.keys(config.colors).map(colorName => `  ${colorName}: ${config.colors[colorName]};`).join('\n')}\n}`;

  gulp.src('./src/core/framework7.less')
    .pipe(modifyFile((content) => {
      const newContent = content
        .replace('//IMPORT_COMPONENTS', '')
        .replace('$includeIosTheme', includeIosTheme)
        .replace('$includeMdTheme', includeMdTheme)
        .replace('$includeDarkTheme', includeDarkTheme)
        .replace('$themeColor', config.themeColor)
        .replace('$colors', colors)
        .replace('$rtl', rtl);
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
      if (rtl) filePath.basename += '.rtl';
    }))
    .pipe(gulp.dest(`${output}/css/`))
    .on('end', () => {
      if (env === 'development') {
        if (cb) cb();
        return;
      }
      gulp.src(`${output}/css/framework7${rtl ? '.rtl' : ''}.css`)
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
  copyLess(config, components);

  let cbs = 0;
  function onCb() {
    cbs += 1;
    if (cbs === (env === 'development' ? 2 : 4) && cb) cb();
  }

  // Build development version
  if (env === 'development') {
    buildBundle(config, components, config.themes, config.rtl, onCb);
    buildCore(config.themes, config.rtl, onCb);
    return;
  }

  // Build production
  buildBundle(config, components, ['ios', 'md'], false, onCb);
  buildBundle(config, components, ['ios', 'md'], true, onCb);
  buildCore(['ios', 'md'], false, onCb);
  buildCore(['ios', 'md'], true, onCb);
}

module.exports = buildLess;

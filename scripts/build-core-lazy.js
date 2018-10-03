/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint arrow-body-style: "off" */
const fs = require('fs');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const modifyFile = require('gulp-modify-file');
const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const header = require('gulp-header');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const getConfig = require('./get-core-config.js');
const getOutput = require('./get-core-output.js');
const banner = require('./banner-core.js');

const coreComponents = [
  'app',
  'statusbar',
  'view',
  'navbar',
  'toolbar',
  'subnavbar',
  'touch-ripple',
  'modal',
  'page',
  'link',
  'block',
  'list',
  'badge',
  'button',
  'icon',
];

const intro = `
function framework7ComponentLoader(Framework7, Framework7AutoInstallComponent) {
  if (typeof Framework7AutoInstallComponent === 'undefined') {
    Framework7AutoInstallComponent = true;
  }
  var doc = document;
  var win = window;
  var $ = Framework7.$;
  var Template7 = Framework7.Template7;
  var Utils = Framework7.utils;
  var Device = Framework7.device;
  var Support = Framework7.support;
  var Framework7Class = Framework7.Class;
  var Modal = Framework7.Modal;
  var ConstructorMethods = Framework7.ConstructorMethods;
  var ModalMethods = Framework7.ModalMethods;

  `;

const install = `
  if (Framework7AutoInstallComponent) {
    if (Framework7.prototype.modules && Framework7.prototype.modules[COMPONENT.name]) {
      return;
    }
    Framework7.use(COMPONENT);
    if (Framework7.instance) {
      Framework7.instance.useModuleParams(COMPONENT, Framework7.instance.params);
      Framework7.instance.useModule(COMPONENT);
    }
  }
  return COMPONENT;
`;

const outro = `
};
`;

function buildLazyComponentsLess(rtl, components, cb) {
  // const env = process.env.NODE_ENV || 'development';
  const config = getConfig();
  const output = getOutput();

  const colorsIos = Object.keys(config.ios.colors).map(colorName => `${colorName} ${config.ios.colors[colorName]}`).join(', ');
  const colorsMd = Object.keys(config.md.colors).map(colorName => `${colorName} ${config.md.colors[colorName]}`).join(', ');
  const includeIosTheme = config.themes.indexOf('ios') >= 0;
  const includeMdTheme = config.themes.indexOf('md') >= 0;
  const includeDarkTheme = config.darkTheme;

  const main = fs.readFileSync('./src/core/framework7.less', 'utf8')
    .split('\n')
    .filter(line => line.indexOf('@import url(\'./components') < 0)
    .join('\n')
    .replace('@import (reference) \'./less/mixins.less\';', '@import (reference) \'../../less/mixins.less\';')
    .replace('$includeIosTheme', includeIosTheme)
    .replace('$includeMdTheme', includeMdTheme)
    .replace('$includeDarkTheme', includeDarkTheme)
    .replace('$themeColorIos', config.ios.themeColor)
    .replace('$colorsIos', colorsIos)
    .replace('$themeColorMd', config.md.themeColor)
    .replace('$colorsMd', colorsMd)
    .replace('$rtl', rtl);

  let cbs = 0;
  const componentsToProcess = components.filter((component) => { // eslint-disable-line
    return fs.existsSync(`./src/core/components/${component}/${component}.js`) && coreComponents.indexOf(component) < 0;
  });

  componentsToProcess.forEach((component) => {
    gulp
      .src(`./src/core/components/${component}/${component}.less`)
      .pipe(modifyFile(content => `${main}\n${content}`))
      .pipe(less())
      .pipe(autoprefixer({
        cascade: false,
      }))
      .pipe(cleanCSS({
        compatibility: '*,-properties.zeroUnits',
      }))
      .pipe(rename((filePath) => {
        if (rtl) filePath.basename += '.rtl';
      }))
      .pipe(gulp.dest(`${output}/lazy-components/`))
      .on('end', () => {
        cbs += 1;
        if (cbs === componentsToProcess.length && cb) cb();
      });
  });
}

function buildLazyComponentsJs(components, cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || config.target || 'universal';
  const format = 'umd';
  const output = getOutput();

  const componentsToProcess = components.filter((component) => { // eslint-disable-line
    return fs.existsSync(`./src/core/components/${component}/${component}.js`);
  });

  rollup
    .rollup({
      input: componentsToProcess.map(component => `./src/core/components/${component}/${component}.js`),
      experimentalCodeSplitting: true,
      optimizeChunks: true,
      plugins: [
        replace({
          delimiters: ['', ''],
          'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
          'process.env.TARGET': JSON.stringify(target),
          'process.env.FORMAT': JSON.stringify(format),
        }),
        resolve({ jsnext: true }),
        commonjs(),
        buble(),
      ],
      onwarn(warning, warn) {
        const ignore = ['EVAL'];
        if (warning.code && ignore.indexOf(warning.code) >= 0) {
          return;
        }
        warn(warning);
      },
    })
    .then((bundle) => { // eslint-disable-line
      return bundle.write({
        strict: true,
        dir: `${output}/lazy-components/`,
        format: 'es',
        exports: 'default',
      });
    })
    .then(() => {
      const files = fs.readdirSync(`${output}/lazy-components/`);
      const filesToProcess = files.filter((fileName) => { // eslint-disable-line
        return fileName.indexOf('.js') > 0
          && fileName.indexOf('chunk-') < 0
          && coreComponents.indexOf(fileName.split('.js')[0]) < 0;
      });
      const filesToRemove = files.filter((fileName) => { // eslint-disable-line
        return fileName.indexOf('.js') > 0
          && (
            fileName.indexOf('chunk-') === 0
            || coreComponents.indexOf(fileName.split('.js')[0]) >= 0
          );
      });
      let cbs = 0;
      filesToProcess.forEach((fileName) => {
        let fileContent = fs.readFileSync(`${output}/lazy-components/${fileName}`, 'utf8')
          .split('\n')
          .filter(line => line.indexOf('import ') !== 0)
          .map(line => line.trim().length ? `  ${line}` : line) // eslint-disable-line
          .join('\n');

        fileContent = `${intro}${fileContent.trim()}${outro}`;
        fileContent = fileContent
          .replace(/export default ([a-zA-Z_]*);/, (line, name) => { // eslint-disable-line
            return install.replace(/COMPONENT/g, name);
          });

        fs.writeFileSync(`${output}/lazy-components/${fileName}`, `${fileContent}\n`);

        gulp.src(`${output}/lazy-components/${fileName}`)
          .pipe(uglify())
          .pipe(modifyFile((content) => { // eslint-disable-line
            return `(${content}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))`;
          }))
          .pipe(gulp.dest(`${output}/lazy-components/`))
          .on('end', () => {
            cbs += 1;
            if (cbs === filesToProcess.length && cb) cb();
          });
      });

      filesToRemove.forEach((fileName) => {
        fs.unlinkSync(`${output}/lazy-components/${fileName}`);
      });
    })
    .catch((err) => {
      console.log(err.toString());
    });
}

function buildLazyFrameworkLess(rtl, cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const colorsIos = Object.keys(config.ios.colors).map(colorName => `${colorName} ${config.ios.colors[colorName]}`).join(', ');
  const colorsMd = Object.keys(config.md.colors).map(colorName => `${colorName} ${config.md.colors[colorName]}`).join(', ');
  const includeIosTheme = config.themes.indexOf('ios') >= 0;
  const includeMdTheme = config.themes.indexOf('md') >= 0;
  const includeDarkTheme = config.darkTheme;
  const output = getOutput();

  gulp.src('./src/core/framework7.less')
    .pipe(modifyFile((content) => {
      const newContent = content
        .replace('//IMPORT_COMPONENTS', '')
        .replace('$includeIosTheme', includeIosTheme)
        .replace('$includeMdTheme', includeMdTheme)
        .replace('$includeDarkTheme', includeDarkTheme)
        .replace('$themeColorIos', config.ios.themeColor)
        .replace('$colorsIos', colorsIos)
        .replace('$themeColorMd', config.md.themeColor)
        .replace('$colorsMd', colorsMd)
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
      filePath.basename = 'framework7-lazy';
      if (rtl) filePath.basename += '.rtl';
    }))
    .pipe(gulp.dest(`${output}/css/`))
    .on('end', () => {
      if (env === 'development') {
        if (cb) cb();
        return;
      }
      gulp.src(`${output}/css/framework7-lazy${rtl ? '.rtl' : ''}.css`)
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

function buildLazyFrameworkJs(cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || config.target || 'universal';
  const format = process.env.FORMAT || config.format || 'umd';
  const output = getOutput();

  rollup.rollup({
    input: './src/core/framework7.js',
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.TARGET': JSON.stringify(target),
        'process.env.FORMAT': JSON.stringify(format),
        '//IMPORT_COMPONENTS': '',
        '//INSTALL_COMPONENTS': '',
        '//ES_IMPORT_HELPERS': '',
        '//NAMED_ES_EXPORT': '',
      }),
      resolve({ jsnext: true }),
      commonjs(),
      buble(),
    ],
    onwarn(warning, warn) {
      const ignore = ['EVAL'];
      if (warning.code && ignore.indexOf(warning.code) >= 0) {
        return;
      }
      warn(warning);
    },
  }).then((bundle) => {
    return bundle.write({
      strict: true,
      file: `${output}/js/framework7-lazy.js`,
      format: 'umd',
      name: 'Framework7',
      sourcemap: env === 'development',
      sourcemapFile: `${output}/js/framework7.js.map`,
      banner,
    });
  }).then(() => {
    if (env === 'development') {
      if (cb) cb();
      return;
    }
    // Minified version
    gulp.src(`${output}/js/framework7-lazy.js`)
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(header(banner))
      .pipe(rename((filePath) => {
        filePath.basename += '.min';
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(`${output}/js/`))
      .on('end', () => {
        if (cb) cb();
      });
  }).catch((err) => {
    if (cb) cb();
    console.log(err.toString());
  });
}

function buildLazy(cb) {
  let cbs = 0;
  const env = process.env.NODE_ENV || 'development';
  const targetCbs = env === 'development' ? 4 : 6;
  const config = getConfig();
  const components = fs.readdirSync('./src/core/components').filter(c => c.indexOf('.') < 0);
  function callback() {
    cbs += 1;
    if (cbs === targetCbs && cb) cb();
  }
  buildLazyComponentsJs(components, callback);
  if (env === 'production') {
    buildLazyComponentsLess(false, components, callback);
    buildLazyComponentsLess(true, components, callback);
  } else {
    buildLazyComponentsLess(config.rtl, components, callback);
  }

  buildLazyFrameworkJs(callback);
  if (env === 'production') {
    buildLazyFrameworkLess(false, callback);
    buildLazyFrameworkLess(true, callback);
  } else {
    buildLazyFrameworkLess(config.rtl, callback);
  }
}

module.exports = buildLazy;

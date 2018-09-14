/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const gulp = require('gulp');
const fs = require('fs');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const header = require('gulp-header');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const modifyFile = require('gulp-modify-file');
const commonjs = require('rollup-plugin-commonjs');
const getConfig = require('./get-core-config.js');
const banner = require('./banner-core.js');
const getOutput = require('./get-core-output.js');

let cache;

function es(components, cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || config.target || 'universal';
  const format = 'es';
  const output = getOutput();

  let cbs = 0;
  const expectCbs = 2;

  // Bundle
  gulp.src('./src/core/framework7.js')
    .pipe(modifyFile((content) => {
      let newContent = content
        .replace('process.env.NODE_ENV', JSON.stringify(env))
        .replace('process.env.TARGET', JSON.stringify(target))
        .replace('process.env.FORMAT', JSON.stringify(format))
        .replace('//IMPORT_COMPONENTS', components.map(component => `import ${component.capitalized} from './components/${component.name}/${component.name}';`).join('\n'))
        .replace('//INSTALL_COMPONENTS', components.map(component => component.capitalized).join(',\n  '))
        .replace('//ES_IMPORT_HELPERS', "import Request from './utils/request';\nimport Utils from './utils/utils';\nimport Support from './utils/support';\nimport Device from './utils/device';")
        .replace('//NAMED_ES_EXPORT', 'export { Template7, $ as Dom7, Request, Utils, Device, Support };');

      newContent = `${banner}\n${newContent}`;
      return newContent;
    }))
    .pipe(rename((file) => { file.basename += '.esm.bundle'; }))
    .pipe(gulp.dest(output))
    .on('end', () => {
      cbs += 1;
      if (cbs === expectCbs) cb();
    });

  // Core
  gulp.src('./src/core/framework7.js')
    .pipe(modifyFile((content) => {
      let newContent = content
        .replace('process.env.NODE_ENV', JSON.stringify(env))
        .replace('process.env.TARGET', JSON.stringify(target))
        .replace('process.env.FORMAT', JSON.stringify(format))
        .replace('//IMPORT_COMPONENTS\n', '')
        .replace('//INSTALL_COMPONENTS\n', '')
        .replace('//ES_IMPORT_HELPERS', "import Request from './utils/request';\nimport Utils from './utils/utils';\nimport Support from './utils/support';\nimport Device from './utils/device';")
        .replace('//NAMED_ES_EXPORT', 'export { Template7, $ as Dom7, Request, Utils, Device, Support };');

      newContent = `${banner}\n${newContent}`;
      return newContent;
    }))
    .pipe(rename((file) => { file.basename += '.esm'; }))
    .pipe(gulp.dest(output))
    .on('end', () => {
      cbs += 1;
      if (cbs === expectCbs) cb();
    });
}
function umd(components, cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || config.target || 'universal';
  const format = process.env.FORMAT || config.format || 'umd';
  const output = getOutput();

  rollup.rollup({
    input: './src/core/framework7.js',
    cache,
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.TARGET': JSON.stringify(target),
        'process.env.FORMAT': JSON.stringify(format),
        '//IMPORT_COMPONENTS': components.map(component => `import ${component.capitalized} from './components/${component.name}/${component.name}';`).join('\n'),
        '//INSTALL_COMPONENTS': components.map(component => component.capitalized).join(',\n  '),
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
    cache = bundle;
    return bundle.write({
      strict: true,
      file: `${output}/js/framework7.js`,
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
    gulp.src(`${output}/js/framework7.js`)
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(header(banner))
      .pipe(rename((filePath) => {
        filePath.basename += '.min';
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(`${output}/js/`))
      .on('end', () => {
        cb();
      });
  }).catch((err) => {
    if (cb) cb();
    console.log(err.toString());
  });
}
function buildJs(cb) {
  const config = getConfig();

  const components = [];
  config.components.forEach((name) => {
    // eslint-disable-next-line
    const capitalized = name.split('-').map((word) => {
      return word.split('').map((char, index) => {
        if (index === 0) return char.toUpperCase();
        return char;
      }).join('');
    }).join('');
    const jsFilePath = `./src/core/components/${name}/${name}.js`;
    if (fs.existsSync(jsFilePath)) {
      components.push({ name, capitalized });
    }
  });

  const expectCbs = 2;
  let cbs = 0;

  umd(components, () => {
    cbs += 1;
    if (cbs === expectCbs) cb();
  });
  es(components, () => {
    cbs += 1;
    if (cbs === expectCbs) cb();
  });
}

module.exports = buildJs;

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint import/no-unresolved: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const gulp = require('gulp');
const fs = require('fs');
const rollupStream = require('rollup-stream');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const header = require('gulp-header');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const commonjs = require('rollup-plugin-commonjs');
const getConfig = require('./get-config.js');
const banner = require('./banner.js');
const getOutput = require('./get-output.js');

let cache;

const external = [
  'dom7',
  'template7',
  'ssr-window',
  'path-to-regexp',
];

const globals = {
  template7: 'Template7',
  dom7: '$',
};

function es(components, cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || config.target || 'universal';
  const format = 'es';
  const output = getOutput();
  let cbs = 0;

  // Bundle
  rollupStream({
    rollup,
    input: './src/framework7.js',
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.TARGET': JSON.stringify(target),
        'process.env.FORMAT': JSON.stringify(format),
        '//IMPORT_COMPONENTS': components.map(component => `import ${component.capitalized} from './components/${component.name}/${component.name}';`).join('\n'),
        '//INSTALL_COMPONENTS': components.map(component => component.capitalized).join(',\n  '),
        '//ES_IMPORT_HELPERS': "import Request from './utils/request';\nimport Utils from './utils/utils';\nimport Support from './utils/support';\nimport Device from './utils/device';",
        '//NAMED_ES_EXPORT': 'export { Template7, $ as Dom7, Request, Utils, Device, Support }',
      }),
      resolve({ jsnext: true }),
      commonjs(),
    ],
    external,
    output: {
      name: 'Framework7',
      format: 'es',
      sourcemap: false,
      strict: true,
      banner,
      globals,
    },
  })
    .on('error', (err) => {
      if (cb) cb();
      console.log(err.toString());
    })
    .pipe(source('framework7.js', './src'))
    .pipe(buffer())
    .pipe(rename('framework7.esm.bundle.js'))
    .pipe(gulp.dest(`${output || `./${env === 'development' ? 'build' : 'dist'}`}/`))
    .on('end', () => {
      cbs += 1;
      if (cbs === 2 && cb) cb();
    });
}
function umd(components, cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || config.target || 'universal';
  const format = process.env.FORMAT || config.format || 'umd';
  const output = getOutput();

  rollupStream({
    rollup,
    input: './src/framework7.js',
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
    cache,
    output: {
      format: 'umd',
      name: 'Framework7',
      sourcemap: env === 'development',
      strict: true,
      banner,
    },
  })
    .on('error', (err) => {
      if (cb) cb();
      console.log(err.toString());
    })
    .on('bundle', (bundle) => {
      cache = bundle;
    })
    .pipe(source('framework7.js', './src'))
    .pipe(buffer())
    .pipe(gulpif(env === 'development', sourcemaps.init({ loadMaps: true })))
    .pipe(gulpif(env === 'development', sourcemaps.write('./')))
    .pipe(gulp.dest(`${output || `./${env === 'development' ? 'build' : 'dist'}`}/js/`))
    .on('end', () => {
      if (env === 'development') {
        if (cb) cb();
        return;
      }
      // Minified version
      gulp.src(`${output || './dist'}/js/framework7.js`)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(header(banner))
        .pipe(rename((filePath) => {
          filePath.basename += '.min';
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${output || './dist'}/js/`))
        .on('end', () => {
          cb();
        });
    });
}
function buildJs(cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';

  const components = [];
  config.components.forEach((name) => {
    // eslint-disable-next-line
    const capitalized = name.split('-').map((word) => {
      return word.split('').map((char, index) => {
        if (index === 0) return char.toUpperCase();
        return char;
      }).join('');
    }).join('');
    const jsFilePath = `./src/components/${name}/${name}.js`;
    if (fs.existsSync(jsFilePath)) {
      components.push({ name, capitalized });
    }
  });

  const expectCbs = env === 'development' ? 1 : 2;
  let cbs = 0;

  umd(components, () => {
    cbs += 1;
    if (cbs === expectCbs) cb();

    if (env === 'production') {
      es(components, () => {
        cbs += 1;
        if (cbs === expectCbs) cb();
      });
    }
  });
}

module.exports = buildJs;

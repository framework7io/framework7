/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: ["error", { allow: ["log"] }] */
const gulp = require('gulp');
const modifyFile = require('gulp-modify-file');
const path = require('path');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const vue = require('rollup-plugin-vue');

function buildKs(cb) {
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || 'universal';
  const buildPath = env === 'development' ? './build' : './packages';

  let f7VuePath = path.resolve(__dirname, `../${buildPath}/vue/framework7-vue.esm.js`);
  let f7Path = path.resolve(__dirname, `../${buildPath}/core/framework7.esm.bundle`);
  if (process.platform.indexOf('win') === 0) {
    f7VuePath = f7VuePath.replace(/\\/g, '/');
    f7Path = f7Path.replace(/\\/g, '/');
  }

  gulp.src('./kitchen-sink/vue/index.html')
    .pipe(modifyFile((content) => {
      if (env === 'development') {
        return content
          .replace('../../packages/core/css/framework7.min.css', '../../build/core/css/framework7.css')
          .replace('../../packages/core/js/framework7.min.js', '../../build/core/js/framework7.js');
      }
      return content
        .replace('../../build/core/css/framework7.css', '../../packages/core/css/framework7.min.css')
        .replace('../../build/core/js/framework7.js', '../../packages/core/js/framework7.min.js');
    }))
    .pipe(gulp.dest('./kitchen-sink/vue'));

  rollup.rollup({
    input: './kitchen-sink/vue/src/app.js',
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env),
        'process.env.TARGET': JSON.stringify(target),
        "'framework7-vue'": () => `'${f7VuePath}'`,
        "'framework7/framework7.esm.bundle'": () => `'${f7Path}'`,
      }),
      resolve({ jsnext: true }),
      commonjs(),
      vue(),
      buble({
        objectAssign: 'Object.assign',
      }),
    ],
    onwarn(warning, warn) {
      const ignore = ['EVAL'];
      if (warning.code && ignore.indexOf(warning.code) >= 0) {
        return;
      }
      warn(warning);
    },
  }).then(bundle => bundle.write({
    format: 'umd',
    name: 'app',
    strict: true,
    sourcemap: false,
    file: './kitchen-sink/vue/js/app.js',
  })).then(() => {
    if (cb) cb();
  }).catch((err) => {
    console.log(err);
    if (cb) cb();
  });
}

module.exports = buildKs;

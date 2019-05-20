/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: ["error", { allow: ["log"] }] */
const path = require('path');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const fs = require('./utils/fs-extra');

// let cache;

function buildKs(cb) {
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || 'universal';
  const buildPath = env === 'development' ? './build' : './packages';

  let f7ReactPath = path.resolve(__dirname, `../${buildPath}/react/framework7-react.esm.js`);
  let f7Path = path.resolve(__dirname, `../${buildPath}/core/framework7.esm.bundle`);
  if (process.platform.indexOf('win') === 0) {
    f7ReactPath = f7ReactPath.replace(/\\/g, '/');
    f7Path = f7Path.replace(/\\/g, '/');
  }

  let index = fs.readFileSync(path.resolve(__dirname, '../kitchen-sink/react/index.html'));
  if (env === 'development') {
    index = index
      .replace('../../packages/core/css/framework7.bundle.min.css', '../../build/core/css/framework7.bundle.css')
      .replace('../../packages/core/js/framework7.bundle.min.js', '../../build/core/js/framework7.bundle.js');
  } else {
    index = index
      .replace('../../build/core/css/framework7.bundle.css', '../../packages/core/css/framework7.bundle.min.css')
      .replace('../../build/core/js/framework7.bundle.js', '../../packages/core/js/framework7.bundle.min.js');
  }
  fs.writeFileSync(path.resolve(__dirname, '../kitchen-sink/react/index.html'), index);

  rollup.rollup({
    input: './kitchen-sink/react/src/app.js',
    // cache,
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env),
        'process.env.TARGET': JSON.stringify(target),
        "'framework7-react'": () => `'${f7ReactPath}'`,
        "'framework7/framework7.esm.bundle'": () => `'${f7Path}'`,
      }),
      resolve({ mainFields: ['module', 'main', 'jsnext'] }),
      commonjs(),
      buble({
        objectAssign: 'Object.assign',
        exclude: [
          'node_modules/react/cjs/react.development.js',
          'node_modules/react-dom/cjs/react-dom.development.js',
        ],
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
    // cache,
    file: './kitchen-sink/react/js/app.js',
  })).then(() => {
    if (cb) cb();
  }).catch((err) => {
    console.log(err);
    if (cb) cb();
  });
}

module.exports = buildKs;

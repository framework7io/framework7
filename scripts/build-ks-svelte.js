/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: ["error", { allow: ["log"] }] */
const path = require('path');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const svelte = require('rollup-plugin-svelte');
const replace = require('@rollup/plugin-replace');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const fs = require('./utils/fs-extra');

function buildKs(cb) {
  const env = process.env.NODE_ENV || 'development';
  const buildPath = env === 'development' ? './build' : './packages';

  let f7SveltePath = path.resolve(__dirname, `../${buildPath}/svelte/framework7-svelte.esm.js`);
  let f7Path = path.resolve(__dirname, `../${buildPath}/core/framework7.esm.bundle`);
  if (process.platform.indexOf('win') === 0) {
    f7SveltePath = f7SveltePath.replace(/\\/g, '/');
    f7Path = f7Path.replace(/\\/g, '/');
  }

  let index = fs.readFileSync(path.resolve(__dirname, '../kitchen-sink/svelte/index.html'));
  if (env === 'development') {
    index = index
      .replace('../../packages/core/css/framework7.bundle.min.css', '../../build/core/css/framework7.bundle.css')
      .replace('../../packages/core/js/framework7.bundle.min.js', '../../build/core/js/framework7.bundle.js');
  } else {
    index = index
      .replace('../../build/core/css/framework7.bundle.css', '../../packages/core/css/framework7.bundle.min.css')
      .replace('../../build/core/js/framework7.bundle.js', '../../packages/core/js/framework7.bundle.min.js');
  }
  fs.writeFileSync(path.resolve(__dirname, '../kitchen-sink/svelte/index.html'), index);

  rollup.rollup({
    input: './kitchen-sink/svelte/src/app.js',
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env),
        "'framework7-svelte'": () => `'${f7SveltePath}'`,
        "'framework7/framework7.esm.bundle'": () => `'${f7Path}'`,
      }),
      resolve({ mainFields: ['module', 'main', 'jsnext'] }),
      commonjs(),
      svelte({
        dev: env === 'development',
      }),
      babel(),
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
    file: './kitchen-sink/svelte/js/app.js',
  })).then(() => {
    if (cb) cb();
  }).catch((err) => {
    console.log(err);
    if (cb) cb();
  });
}

module.exports = buildKs;

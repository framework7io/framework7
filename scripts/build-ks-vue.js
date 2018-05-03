/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const path = require('path');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const vue = require('rollup-plugin-vue');

let cache;

function buildKs(cb) {
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || 'universal';

  // const f7VuePath = env === 'development'
  //   ? '../src/framework7-vue'
  //   : '../dist/framework7-vue.esm.js';

  const f7VuePath = path.resolve(__dirname, '../vue/framework7-vue.esm.js');

  rollup.rollup({
    input: './vue/kitchen-sink/src/app.js',
    cache,
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env),
        'process.env.TARGET': JSON.stringify(target),
        "'framework7-vue'": () => `'${f7VuePath}'`,
      }),
      resolve({ jsnext: true }),
      commonjs(),
      vue(),
      buble({
        objectAssign: 'Object.assign',
      }),
    ],
  }).then((bundle) => {
    cache = bundle;
    return bundle.write({
      format: 'umd',
      name: 'app',
      strict: true,
      sourcemap: false,
      cache,
      file: './vue/kitchen-sink/js/app.js',
    });
  }).then(() => {
    if (cb) cb();
  }).catch((err) => {
    if (cb) cb();
    console.log(err.toString());
  });
}

module.exports = buildKs;

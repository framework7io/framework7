/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: ["error", { allow: ["log"] }] */
const path = require('path');
const rollup = require('rollup');
const { babel } = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const vue = require('rollup-plugin-vue');
const fs = require('./utils/fs-extra');

function buildKs(cb) {
  const env = process.env.NODE_ENV || 'development';
  const buildPath = env === 'development' ? './build' : './packages';

  let f7VuePath = path.resolve(__dirname, `../${buildPath}/vue/`);
  let f7Path = path.resolve(__dirname, `../${buildPath}/core/lite-bundle`);
  let f7LitePath = path.resolve(__dirname, `../${buildPath}/core/lite`);
  if (process.platform.indexOf('win') === 0) {
    f7VuePath = f7VuePath.replace(/\\/g, '/');
    f7Path = f7Path.replace(/\\/g, '/');
    f7LitePath = f7LitePath.replace(/\\/g, '/');
  }

  let index = fs.readFileSync(path.resolve(__dirname, '../kitchen-sink/vue/index.html'));
  if (env === 'development') {
    index = index.replace(
      '../../packages/core/framework7-bundle.min.css',
      '../../build/core/framework7-bundle.css',
    );
  } else {
    index = index.replace(
      '../../build/core/framework7-bundle.css',
      '../../packages/core/framework7-bundle.min.css',
    );
  }
  fs.writeFileSync(path.resolve(__dirname, '../kitchen-sink/vue/index.html'), index);

  rollup
    .rollup({
      input: './kitchen-sink/vue/src/app.js',
      plugins: [
        replace({
          delimiters: ['', ''],
          'process.env.NODE_ENV': JSON.stringify(env),
          "'framework7-vue'": () => `'${f7VuePath}'`,
          "'framework7/lite-bundle'": () => `'${f7Path}'`,
          "'framework7/lite'": () => `'${f7LitePath}'`,
        }),
        nodeResolve({ mainFields: ['module', 'main', 'jsnext'] }),
        commonjs(),
        vue({
          css: false,
          template: {
            isProduction: true,
          },
        }),
        babel({
          babelHelpers: 'bundled',
          presets: [['@babel/preset-env', { modules: false, loose: true }]],
        }),
      ],
      onwarn(warning, warn) {
        const ignore = ['EVAL'];
        if (warning.code && ignore.indexOf(warning.code) >= 0) {
          return;
        }
        warn(warning);
      },
    })
    .then((bundle) =>
      bundle.write({
        format: 'umd',
        name: 'app',
        strict: true,
        sourcemap: false,
        file: './kitchen-sink/vue/js/app.js',
      }),
    )
    .then(() => {
      if (cb) cb();
    })
    .catch((err) => {
      console.log(err);
      if (cb) cb();
    });
}

module.exports = buildKs;

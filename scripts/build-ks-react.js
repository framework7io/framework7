/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: ["error", { allow: ["log"] }] */
const path = require('path');
const rollup = require('rollup');
const { babel } = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const fs = require('./utils/fs-extra');

// let cache;

function buildKs(cb) {
  const env = process.env.NODE_ENV || 'development';
  const buildPath = env === 'development' ? './build' : './packages';

  let f7ReactPath = path.resolve(__dirname, `../${buildPath}/react`);
  let f7Path = path.resolve(__dirname, `../${buildPath}/core/lite-bundle`);
  if (process.platform.indexOf('win') === 0) {
    f7ReactPath = f7ReactPath.replace(/\\/g, '/');
    f7Path = f7Path.replace(/\\/g, '/');
  }

  let index = fs.readFileSync(path.resolve(__dirname, '../kitchen-sink/react/index.html'));
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
  fs.writeFileSync(path.resolve(__dirname, '../kitchen-sink/react/index.html'), index);

  rollup
    .rollup({
      input: './kitchen-sink/react/src/app.js',
      // cache,
      plugins: [
        replace({
          delimiters: ['', ''],
          'process.env.NODE_ENV': JSON.stringify(env),
          "'framework7-react'": () => `'${f7ReactPath}'`,
          "'framework7/lite-bundle'": () => `'${f7Path}'`,
        }),
        nodeResolve({ mainFields: ['module', 'main', 'jsnext'] }),
        commonjs(),
        babel({
          babelHelpers: 'bundled',
          presets: ['@babel/preset-react', ['@babel/preset-env', { modules: false, loose: true }]],
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
        // cache,
        file: './kitchen-sink/react/js/app.js',
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

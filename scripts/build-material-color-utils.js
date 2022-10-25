const fs = require('fs');
const path = require('path');
const { rollup } = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const virtual = require('@rollup/plugin-virtual');
const { minify } = require('terser');

async function build(cb) {
  const outputFile = path.resolve(__dirname, '../src/core/shared/material-color-utils.js');
  await rollup({
    input: 'entry',
    plugins: [
      virtual({
        entry: `export { argbFromHex, hexFromArgb, themeFromSourceColor } from '@material/material-color-utilities';`,
      }),
      nodeResolve({ mainFields: ['module', 'main', 'jsnext'] }),
      commonjs(),
    ],
  })
    .then((bundle) => {
      return bundle.write({
        strict: true,
        file: outputFile,
        format: 'esm',
        sourcemap: false,
      });
    })
    .then(async (bundle) => {
      const result = bundle.output[0];
      const minified = await minify(result.code, {
        mangle: false,
        format: {
          indent_level: 2,
          beautify: true,
          comments: false,
          preamble: '/* eslint-disable */',
        },
      });

      fs.writeFileSync(outputFile, minified.code);
    })
    .catch((err) => {
      // eslint-disable-next-line
      console.log(err);
    });
  if (cb) cb();
}

module.exports = build;

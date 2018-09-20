// const gulp = require('gulp');
// const fs = require('fs');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

rollup.rollup({
  input: [
    './packages/core/framework7.esm.js',
    './packages/core/components/accordion/accordion.js',
    './packages/core/components/actions/actions.js',
    './packages/core/components/swiper/swiper.js',
    './packages/core/components/photo-browser/photo-browser.js',
    './packages/core/components/calendar/calendar.js',
  ],
  experimentalCodeSplitting: true,
  experimentalDynamicImport: true,
  optimizeChunks: true,
  plugins: [
    // replace({
    //   delimiters: ['', ''],
    //   'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
    //   'process.env.TARGET': JSON.stringify(target),
    //   'process.env.FORMAT': JSON.stringify(format),
    //   '//IMPORT_COMPONENTS': components.map(component => `import ${component.capitalized} from './components/${component.name}/${component.name}';`).join('\n'),
    //   '//INSTALL_COMPONENTS': components.map(component => component.capitalized).join(',\n  '),
    //   '//ES_IMPORT_HELPERS': '',
    //   '//NAMED_ES_EXPORT': '',
    // }),
    resolve({ jsnext: true }),
    commonjs(),
    // buble(),
  ],
}).then((bundle) => {
  return bundle.write({
    strict: true,
    dir: './code-splitting/',
    format: 'es',
    exports: 'default',
    // name: 'Framework7',
    // sourcemap: env === 'development',
    // sourcemapFile: `${output}/js/framework7.js.map`,
    // banner,
  });
}).catch((err) => {
  console.log(err.toString());
});

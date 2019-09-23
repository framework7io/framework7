/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const path = require('path');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const Terser = require('terser');
const commonjs = require('rollup-plugin-commonjs');
const getConfig = require('./get-core-config.js');
const banner = require('./banners/core.js');
const getOutput = require('./get-output.js');
const fs = require('./utils/fs-extra');

let cache;

function esLite({ components } = {}) {
  const env = process.env.NODE_ENV || 'development';
  const format = 'es';
  const output = path.resolve(`${getOutput()}`, 'core');
  const esContent = fs.readFileSync(path.resolve(__dirname, '../src/core/framework7.js'));

  // Bundle
  const bundleContent = esContent
    .replace('process.env.NODE_ENV', JSON.stringify(env))
    .replace('process.env.FORMAT', JSON.stringify(format))
    .replace('//IMPORT_COMPONENTS', components.map(component => `import ${component.capitalized} from './components/${component.name}/${component.name}';`).join('\n'))
    .replace('//INSTALL_COMPONENTS', components.map(component => component.capitalized).join(',\n  '))
    .replace('//ES_IMPORT_HELPERS', "import Request from './utils/request';\nimport Utils from './utils/utils';\nimport Support from './utils/support';\nimport Device from './utils/device';")
    .replace('//NAMED_ES_EXPORT', 'export { Template7, $ as Dom7, Request, Utils, Device, Support };')
    .split('\n')
    .filter(line => line.indexOf('//NO_LITE') < 0)
    .join('\n');

  // Core
  const coreContent = esContent
    .replace('process.env.NODE_ENV', JSON.stringify(env))
    .replace('process.env.FORMAT', JSON.stringify(format))
    .replace('//IMPORT_COMPONENTS\n', '')
    .replace('//INSTALL_COMPONENTS\n', '')
    .replace('//ES_IMPORT_HELPERS', "import Request from './utils/request';\nimport Utils from './utils/utils';\nimport Support from './utils/support';\nimport Device from './utils/device';")
    .replace('//NAMED_ES_EXPORT', 'export { Template7, $ as Dom7, Request, Utils, Device, Support };')
    .split('\n')
    .filter(line => line.indexOf('//NO_LITE') < 0)
    .join('\n');

  // Save
  fs.writeFileSync(`${output}/framework7-lite.esm.bundle.js`, `${banner}\n${bundleContent}`);
  fs.writeFileSync(`${output}/framework7-lite.esm.js`, `${banner}\n${coreContent}`);
}

function es({ components } = {}) {
  const env = process.env.NODE_ENV || 'development';
  const format = 'es';
  const output = path.resolve(`${getOutput()}`, 'core');
  const esContent = fs.readFileSync(path.resolve(__dirname, '../src/core/framework7.js'));

  // Bundle
  const bundleContent = esContent
    .replace('process.env.NODE_ENV', JSON.stringify(env))
    .replace('process.env.FORMAT', JSON.stringify(format))
    .replace('//IMPORT_COMPONENTS', components.map(component => `import ${component.capitalized} from './components/${component.name}/${component.name}';`).join('\n'))
    .replace('//INSTALL_COMPONENTS', components.map(component => component.capitalized).join(',\n  '))
    .replace('//ES_IMPORT_HELPERS', "import Request from './utils/request';\nimport Utils from './utils/utils';\nimport Support from './utils/support';\nimport Device from './utils/device';")
    .replace('//NAMED_ES_EXPORT', 'export { Template7, $ as Dom7, Request, Utils, Device, Support, Component };');

  // Core
  const coreContent = esContent
    .replace('process.env.NODE_ENV', JSON.stringify(env))
    .replace('process.env.FORMAT', JSON.stringify(format))
    .replace('//IMPORT_COMPONENTS\n', '')
    .replace('//INSTALL_COMPONENTS\n', '')
    .replace('//ES_IMPORT_HELPERS', "import Request from './utils/request';\nimport Utils from './utils/utils';\nimport Support from './utils/support';\nimport Device from './utils/device';")
    .replace('//NAMED_ES_EXPORT', 'export { Template7, $ as Dom7, Request, Utils, Device, Support, Component };');

  // Save
  fs.writeFileSync(`${output}/framework7.esm.bundle.js`, `${banner}\n${bundleContent}`);
  fs.writeFileSync(`${output}/framework7.esm.js`, `${banner}\n${coreContent}`);
}
async function umdBundle({ components, lite } = {}) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const format = process.env.FORMAT || config.format || 'umd';
  const output = path.resolve(`${getOutput()}`, 'core');
  const outputFileName = lite ? 'framework7-lite' : 'framework7';

  return rollup.rollup({
    input: lite ? `${output}/framework7-lite.esm.bundle.js` : './src/core/framework7.js',
    cache,
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.FORMAT': JSON.stringify(format),
        '//IMPORT_COMPONENTS': components.map(component => `import ${component.capitalized} from './components/${component.name}/${component.name}';`).join('\n'),
        '//INSTALL_COMPONENTS': components.map(component => component.capitalized).join(',\n  '),
        '//ES_IMPORT_HELPERS': '',
        '//NAMED_ES_EXPORT': '',
        'export { Template7, $ as Dom7, Request, Utils, Device, Support };': '',
      }),
      resolve({ mainFields: ['module', 'main', 'jsnext'] }),
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
      file: `${output}/js/${outputFileName}.bundle.js`,
      format: 'umd',
      name: 'Framework7',
      sourcemap: env === 'development',
      sourcemapFile: `${output}/js/${outputFileName}.bundle.js.map`,
      banner,
    });
  }).then((bundle) => {
    if (env === 'development') {
      return;
    }
    const result = bundle.output[0];
    const minified = Terser.minify(result.code, {
      sourceMap: {
        content: env === 'development' ? result.map : undefined,
        filename: env === 'development' ? undefined : `${outputFileName}.bundle.min.js`,
        url: `${outputFileName}.bundle.min.js.map`,
      },
      output: {
        preamble: banner,
      },
    });

    fs.writeFileSync(`${output}/js/${outputFileName}.bundle.min.js`, minified.code);
    fs.writeFileSync(`${output}/js/${outputFileName}.bundle.min.js.map`, minified.map);
  }).catch((err) => {
    console.log(err);
  });
}

async function umdCore({ lite } = {}) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const format = process.env.FORMAT || config.format || 'umd';
  const output = path.resolve(`${getOutput()}`, 'core');
  const outputFileName = lite ? 'framework7-lite' : 'framework7';

  return rollup.rollup({
    input: lite ? `${output}/framework7-lite.esm.js` : './src/core/framework7.js',
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.FORMAT': JSON.stringify(format),
        '//IMPORT_COMPONENTS': '',
        '//INSTALL_COMPONENTS': '',
        '//ES_IMPORT_HELPERS': '',
        '//NAMED_ES_EXPORT': '',
        'export { Template7, $ as Dom7, Request, Utils, Device, Support };': '',
      }),
      resolve({ mainFields: ['module', 'main', 'jsnext'] }),
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
  }).then((bundle) => { // eslint-disable-line
    return bundle.write({
      strict: true,
      file: `${output}/js/${outputFileName}.js`,
      format: 'umd',
      name: 'Framework7',
      sourcemap: false,
      banner,
    });
  }).then((bundle) => {
    if (env === 'development') {
      return;
    }
    const result = bundle.output[0];
    const minified = Terser.minify(result.code, {
      sourceMap: {
        filename: `${outputFileName}.min.js`,
        url: `${outputFileName}.min.js.map`,
      },
      output: {
        preamble: banner,
      },
    });

    fs.writeFileSync(`${output}/js/${outputFileName}.min.js`, minified.code);
    fs.writeFileSync(`${output}/js/${outputFileName}.min.js.map`, minified.map);
  }).catch((err) => {
    console.log(err);
  });
}

async function buildJs(cb) {
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
    const jsFilePath = `./src/core/components/${name}/${name}.js`;
    if (fs.existsSync(jsFilePath)) {
      components.push({ name, capitalized });
    }
  });

  await umdCore();
  await umdBundle({ components });
  es({ components });
  if (env !== 'development') {
    esLite({ components });
    await umdCore({ lite: true });
    await umdBundle({ components, lite: true });
  }
  cb();
}

module.exports = buildJs;

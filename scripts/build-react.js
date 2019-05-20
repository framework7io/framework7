/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */


const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');

const Terser = require('terser');
const bannerReact = require('./banners/react');
const getOutput = require('./get-output.js');
const fs = require('./utils/fs-extra');

function esm({ banner, componentImports, componentAliases, componentExports }) {
  return `
${banner}

${componentImports.join('\n')}
import Framework7React from './utils/plugin';

${componentAliases.join('\n')}

export {\n${componentExports.join(',\n')}\n};

export default Framework7React;
  `.trim();
}

// Build React
function buildReact(cb) {
  const env = process.env.NODE_ENV || 'development';
  const buildPath = getOutput();
  const pluginContent = fs.readFileSync(`${buildPath}/react/utils/plugin.js`);

  /* Replace plugin vars: utils/plugin.js */
  const newPluginContent = pluginContent
    .replace('// IMPORT_LIBRARY', 'import React from \'react\';')
    .replace('// IMPORT_COMPONENTS\n', '')
    .replace('// REGISTER_COMPONENTS\n', '')
    .replace(/EXTEND/g, 'params.React ? params.React.Component : React.Component')
    .replace(/COMPILER/g, '\'react\'');

  fs.writeFileSync(`${buildPath}/react/utils/plugin.js`, newPluginContent);

  /* Build main components esm module: framework7-react.esm.js */
  const files = fs.readdirSync(`${buildPath}/react/components`).filter(file => file.indexOf('.d.ts') < 0);
  const components = [];
  const componentImports = [];
  const componentAliases = [];
  const componentExports = [];

  files.forEach((fileName) => {
    const componentName = fileName
      .replace('.js', '')
      .split('-')
      .map(word => word[0].toUpperCase() + word.substr(1))
      .join('');
    components.push({
      name: `${componentName}`,
      importName: `F7${componentName}`,
    });
    componentImports.push(`import F7${componentName} from './components/${fileName.replace('.js', '')}';`);
    componentAliases.push(`const ${componentName} = F7${componentName};`);
    componentExports.push(`  F7${componentName}`, `  ${componentName}`);
  });

  const componentsContent = esm({
    banner: bannerReact.trim(),
    componentImports,
    componentAliases,
    componentExports,
  });

  fs.writeFileSync(`${buildPath}/react/framework7-react.esm.js`, componentsContent);

  /* Build esm module bundle for rollup UMD: components + plugin -> framework7-react.esm.bundle.js */
  const registerComponents = components
    .map(c => `window.${c.name} = ${c.importName};`)
    .join('\n    ');

  const esmBundlePluginContent = pluginContent
    .replace(/ from '\.\//g, ' from \'./utils/')
    .replace('// IMPORT_LIBRARY', 'import React from \'react\';')
    .replace('// IMPORT_COMPONENTS', `${componentImports.join('\n')}\n`)
    .replace('// REGISTER_COMPONENTS', registerComponents)
    .replace(/EXTEND/g, 'params.React ? params.React.Component : React.Component')
    .replace(/COMPILER/g, '\'react\'');

  fs.writeFileSync(`${buildPath}/react/framework7-react.esm.bundle.js`, bannerReact + esmBundlePluginContent);

  /* Build UMD from esm bundle: framework7-react.esm.bundle.js -> framework7-react.js */
  rollup.rollup({
    input: `${buildPath}/react/framework7-react.esm.bundle.js`,
    external: ['react'],
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
      }),
      resolve({ mainFields: ['module', 'main', 'jsnext'] }),
      commonjs(),
      buble({
        objectAssign: 'Object.assign',
      }),
    ],
  }).then(bundle => bundle.write({
    globals: {
      react: 'React',
    },
    strict: true,
    file: `${buildPath}/react/framework7-react.bundle.js`,
    format: 'umd',
    name: 'Framework7React',
    sourcemap: env === 'development',
    sourcemapFile: `${buildPath}/react/framework7-react.bundle.js.map`,
    banner: bannerReact,
  })).then((bundle) => {
    // Remove esm.bundle
    fs.unlinkSync(`${buildPath}/react/framework7-react.esm.bundle.js`);

    if (env === 'development') {
      if (cb) cb();
      return;
    }
    const result = bundle.output[0];
    const minified = Terser.minify(result.code, {
      sourceMap: {
        filename: 'framework7-react.bundle.min.js',
        url: 'framework7-react.bundle.min.js.map',
      },
      output: {
        preamble: bannerReact,
      },
    });
    fs.writeFileSync(`${buildPath}/react/framework7-react.bundle.min.js`, minified.code);
    fs.writeFileSync(`${buildPath}/react/framework7-react.bundle.min.js.map`, minified.map);
    if (cb) cb();
  }).catch((err) => {
    if (cb) cb();
    console.log(err);
  });
}

module.exports = buildReact;

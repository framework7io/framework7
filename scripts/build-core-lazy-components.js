/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint arrow-body-style: "off" */
// const fs = require('fs');
const path = require('path');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const Terser = require('terser');
const less = require('./utils/less');
const autoprefixer = require('./utils/autoprefixer');
const cleanCSS = require('./utils/clean-css');
const getConfig = require('./get-core-config.js');
const getOutput = require('./get-output.js');
const coreComponents = require('./core-components');
const fs = require('./utils/fs-extra');

const intro = `
function framework7ComponentLoader(Framework7, Framework7AutoInstallComponent) {
  if (typeof Framework7AutoInstallComponent === 'undefined') {
    Framework7AutoInstallComponent = true;
  }
  var doc = document;
  var win = window;
  var $ = Framework7.$;
  var Template7 = Framework7.Template7;
  var Utils = Framework7.utils;
  var Device = Framework7.device;
  var Support = Framework7.support;
  var Framework7Class = Framework7.Class;
  var Modal = Framework7.Modal;
  var ConstructorMethods = Framework7.ConstructorMethods;
  var ModalMethods = Framework7.ModalMethods;

  `;

const install = `
  if (Framework7AutoInstallComponent) {
    if (Framework7.prototype.modules && Framework7.prototype.modules[COMPONENT.name]) {
      return;
    }
    Framework7.use(COMPONENT);
    if (Framework7.instance) {
      Framework7.instance.useModuleParams(COMPONENT, Framework7.instance.params);
      Framework7.instance.useModule(COMPONENT);
    }
  }
  return COMPONENT;
`;

const outro = `
};
`;

async function buildLazyComponentsLess(components, rtl, cb) {
  const config = getConfig();
  const output = `${getOutput()}/core`;
  const colors = `{\n${Object.keys(config.colors).map(colorName => `  ${colorName}: ${config.colors[colorName]};`).join('\n')}\n}`;
  const includeIosTheme = config.themes.indexOf('ios') >= 0;
  const includeMdTheme = config.themes.indexOf('md') >= 0;
  const includeAuroraTheme = config.themes.indexOf('aurora') >= 0;
  const includeDarkTheme = config.darkTheme;

  const mainLess = fs.readFileSync(path.resolve(__dirname, '../src/core/framework7.less'))
    .split('\n')
    .filter(line => line.indexOf('@import url(\'./components') < 0)
    .join('\n')
    .replace('@import (reference) \'./less/mixins.less\';', '@import (reference) \'../../less/mixins.less\';')
    .replace('$includeIosTheme', includeIosTheme)
    .replace('$includeMdTheme', includeMdTheme)
    .replace('$includeAuroraTheme', includeAuroraTheme)
    .replace('$includeDarkTheme', includeDarkTheme)
    .replace('$themeColor', config.themeColor)
    .replace('$colors', colors)
    .replace('$rtl', rtl);

  let cbs = 0;
  const componentsToProcess = components.filter((component) => { // eslint-disable-line
    return fs.existsSync(path.resolve(__dirname, `../src/core/components/${component}/${component}.less`)) && coreComponents.indexOf(component) < 0;
  });

  componentsToProcess.forEach(async (component) => {
    const lessContent = fs.readFileSync(path.resolve(__dirname, `../src/core/components/${component}/${component}.less`));

    let cssContent;
    try {
      cssContent = await cleanCSS(
        await autoprefixer(
          await less(`${mainLess}\n${lessContent}`, path.resolve(__dirname, `../src/core/components/${component}/`))
        )
      );
    } catch (err) {
      console.log(err);
    }
    fs.writeFileSync(`${output}/components/${component}${rtl ? '.rtl' : ''}.css`, cssContent);

    cbs += 1;
    if (cbs === componentsToProcess.length && cb) cb();
  });
}

function buildLazyComponentsJs(components, cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || config.target || 'universal';
  const format = 'umd';
  const output = `${getOutput()}/core`;

  const componentsToProcess = components.filter((component) => { // eslint-disable-line
    return fs.existsSync(`./src/core/components/${component}/${component}.js`);
  });

  rollup
    .rollup({
      input: componentsToProcess.map(component => `./src/core/components/${component}/${component}.js`),
      experimentalOptimizeChunks: true,
      plugins: [
        replace({
          delimiters: ['', ''],
          'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
          'process.env.TARGET': JSON.stringify(target),
          'process.env.FORMAT': JSON.stringify(format),
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
    })
    .then((bundle) => { // eslint-disable-line
      return bundle.write({
        strict: true,
        dir: `${output}/components/`,
        format: 'es',
        exports: 'default',
      });
    })
    .then(() => {
      const files = fs.readdirSync(`${output}/components/`);
      const filesToProcess = files.filter((fileName) => { // eslint-disable-line
        return fileName.indexOf('.js') > 0
          && fileName.indexOf('chunk-') < 0
          && coreComponents.indexOf(fileName.split('.js')[0]) < 0;
      });
      const filesToRemove = files.filter((fileName) => { // eslint-disable-line
        return fileName.indexOf('.js') > 0
          && (
            fileName.indexOf('chunk-') === 0
            || coreComponents.indexOf(fileName.split('.js')[0]) >= 0
          );
      });
      let cbs = 0;
      filesToProcess.forEach((fileName) => {
        let fileContent = fs.readFileSync(`${output}/components/${fileName}`)
          .split('\n')
          .filter(line => line.indexOf('import ') !== 0)
          .map(line => line.trim().length ? `  ${line}` : line) // eslint-disable-line
          .join('\n');

        fileContent = `${intro}${fileContent.trim()}${outro}`;
        fileContent = fileContent
          .replace(/export default ([a-zA-Z_]*);/, (line, name) => { // eslint-disable-line
            return install.replace(/COMPONENT/g, name);
          });

        fileContent = Terser.minify(fileContent).code;
        fileContent = `(${fileContent}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))`;

        fs.writeFileSync(`${output}/components/${fileName}`, `${fileContent}\n`);

        cbs += 1;
        if (cbs === filesToProcess.length && cb) cb();
      });

      filesToRemove.forEach((fileName) => {
        fs.unlinkSync(`${output}/components/${fileName}`);
      });
    })
    .catch((err) => {
      console.log(err.toString());
    });
}

function buildLazyComponents(cb) {
  let cbs = 0;
  const env = process.env.NODE_ENV || 'development';
  const targetCbs = env === 'development' ? 2 : 3;
  const config = getConfig();
  const components = fs.readdirSync('./src/core/components').filter(c => c.indexOf('.') < 0);
  function callback() {
    cbs += 1;
    if (cbs === targetCbs && cb) cb();
  }
  buildLazyComponentsJs(components, callback);
  if (env === 'production') {
    buildLazyComponentsLess(components, false, callback);
    buildLazyComponentsLess(components, true, callback);
  } else {
    buildLazyComponentsLess(components, config.rtl, callback);
  }
}

module.exports = buildLazyComponents;

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const path = require('path');
const less = require('./utils/less');
const autoprefixer = require('./utils/autoprefixer');
const cleanCSS = require('./utils/clean-css');
const getConfig = require('./get-core-config.js');
const getOutput = require('./get-output.js');
const banner = require('./banners/core.js');
const fs = require('./utils/fs-extra');

// Copy LESS
function copyLess(config, components, cb) {
  const output = `${getOutput()}/core`;
  const colors = `{\n${Object.keys(config.colors).map(colorName => `  ${colorName}: ${config.colors[colorName]};`).join('\n')}\n}`;
  const includeIosTheme = config.themes.indexOf('ios') >= 0;
  const includeMdTheme = config.themes.indexOf('md') >= 0;
  const includeAuroraTheme = config.themes.indexOf('aurora') >= 0;
  const includeDarkTheme = config.darkTheme;
  const rtl = config.rtl;

  // Core LESS
  let lessContent = fs.readFileSync(path.resolve(__dirname, '../src/core/framework7.less'));
  lessContent = `${banner}\n${lessContent}`;
  lessContent = lessContent
    .replace('$includeIosTheme', includeIosTheme)
    .replace('$includeMdTheme', includeMdTheme)
    .replace('$includeAuroraTheme', includeAuroraTheme)
    .replace('$includeDarkTheme', includeDarkTheme)
    .replace('$colors', colors)
    .replace('$themeColor', config.themeColor)
    .replace('$rtl', rtl);

  fs.writeFileSync(`${output}/framework7.less`, lessContent);

  // Bundle LESS
  const lessBundleContent = lessContent
    .replace('//IMPORT_COMPONENTS', components.map(component => `@import url('./components/${component}/${component}.less');`).join('\n'));
  fs.writeFileSync(`${output}/framework7.bundle.less`, lessBundleContent);

  if (cb) cb();
}
// Build CSS Bundle
async function buildBundle(config, components, themes, rtl, cb) {
  const env = process.env.NODE_ENV || 'development';
  const colors = `{\n${Object.keys(config.colors).map(colorName => `  ${colorName}: ${config.colors[colorName]};`).join('\n')}\n}`;
  const includeIosTheme = themes.indexOf('ios') >= 0;
  const includeMdTheme = themes.indexOf('md') >= 0;
  const includeAuroraTheme = themes.indexOf('aurora') >= 0;
  const includeDarkTheme = config.darkTheme;
  const outputFileName = `framework7.bundle${rtl ? '.rtl' : ''}`;
  const output = `${getOutput()}/core`;

  let lessContent = fs.readFileSync(path.resolve(__dirname, '../src/core/framework7.less'));
  lessContent = lessContent
    .replace('//IMPORT_COMPONENTS', components.map(component => `@import url('./components/${component}/${component}.less');`).join('\n'))
    .replace('$includeIosTheme', includeIosTheme)
    .replace('$includeMdTheme', includeMdTheme)
    .replace('$includeAuroraTheme', includeAuroraTheme)
    .replace('$includeDarkTheme', includeDarkTheme)
    .replace('$colors', colors)
    .replace('$themeColor', config.themeColor)
    .replace('$rtl', rtl);

  let cssContent;
  try {
    cssContent = await autoprefixer(
      await less(lessContent, path.resolve(__dirname, '../src/core'))
    );
  } catch (err) {
    console.log(err);
  }

  // Write file
  fs.writeFileSync(`${output}/css/${outputFileName}.css`, `${banner}\n${cssContent}`);

  if (env === 'development') {
    if (cb) cb();
    return;
  }

  // Minified
  const minifiedContent = await cleanCSS(cssContent);

  // Write file
  fs.writeFileSync(`${output}/css/${outputFileName}.min.css`, `${banner}\n${minifiedContent}`);

  if (cb) cb();
}

// Build CSS Core
async function buildCore(themes, rtl, cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const includeIosTheme = themes.indexOf('ios') >= 0;
  const includeMdTheme = themes.indexOf('md') >= 0;
  const includeAuroraTheme = themes.indexOf('aurora') >= 0;
  const includeDarkTheme = config.darkTheme;
  const output = `${getOutput()}/core`;
  const colors = `{\n${Object.keys(config.colors).map(colorName => `  ${colorName}: ${config.colors[colorName]};`).join('\n')}\n}`;

  let lessContent = fs.readFileSync(path.resolve(__dirname, '../src/core/framework7.less'));
  lessContent = lessContent
    .replace('//IMPORT_COMPONENTS', '')
    .replace('$includeIosTheme', includeIosTheme)
    .replace('$includeMdTheme', includeMdTheme)
    .replace('$includeAuroraTheme', includeAuroraTheme)
    .replace('$includeDarkTheme', includeDarkTheme)
    .replace('$colors', colors)
    .replace('$themeColor', config.themeColor)
    .replace('$rtl', rtl);

  let cssContent;
  try {
    cssContent = await autoprefixer(
      await less(lessContent, path.resolve(__dirname, '../src/core'))
    );
  } catch (e) {
    console.log(e);
  }

  // Write file
  fs.writeFileSync(`${output}/css/framework7${rtl ? '.rtl' : ''}.css`, `${banner}\n${cssContent}`);

  if (env === 'development') {
    if (cb) cb();
    return;
  }

  // Minified
  const minifiedContent = await cleanCSS(cssContent);

  // Write file
  fs.writeFileSync(`${output}/css/framework7${rtl ? '.rtl' : ''}.min.css`, `${banner}\n${minifiedContent}`);

  if (cb) cb();
}

function buildLess(cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';

  const components = [];
  config.components.forEach((name) => {
    const lessFilePath = `./src/core/components/${name}/${name}.less`;
    if (fs.existsSync(lessFilePath)) {
      components.push(name);
    }
  });

  // Copy Less
  copyLess(config, components);

  let cbs = 0;
  function onCb() {
    cbs += 1;
    if (cbs === (env === 'development' ? 2 : 4) && cb) cb();
  }

  // Build development version
  if (env === 'development') {
    buildBundle(config, components, config.themes, config.rtl, onCb);
    buildCore(config.themes, config.rtl, onCb);
    return;
  }

  // Build production
  buildBundle(config, components, config.themes, false, onCb);
  buildBundle(config, components, config.themes, true, onCb);
  buildCore(config.themes, false, onCb);
  buildCore(config.themes, true, onCb);
}

module.exports = buildLess;

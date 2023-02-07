/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const path = require('path');
const glob = require('glob');
const less = require('./utils/less.js');
const autoprefixer = require('./utils/autoprefixer.js');
const cleanCSS = require('./utils/clean-css.js');
const getConfig = require('./get-core-config.js');
const getOutput = require('./get-output.js');
const banner = require('./banners/core.js');
const fs = require('./utils/fs-extra.js');
const coreComponents = require('./core-components-list.js');

// CSS for each components
async function buildComponentsStyles(components, rtl, cb) {
  const config = getConfig();
  const output = `${getOutput()}/core`;
  const includeIosTheme = config.themes.indexOf('ios') >= 0;
  const includeMdTheme = config.themes.indexOf('md') >= 0;
  const includeDarkTheme = config.darkTheme;
  const includeLightTheme = config.lightTheme;

  const mainLess = fs
    .readFileSync(path.resolve(__dirname, '../src/core/framework7.less'))
    .split('\n')
    .filter((line) => line.indexOf("@import './components") < 0)
    .join('\n')
    .replace(
      "@import (reference) './less/mixins.less';",
      "@import (reference) '../../less/mixins.less';",
    )
    .replace(
      "@import (reference) './less/vars.less';",
      "@import (reference) '../../less/vars.less';",
    )
    .replace('$includeIosTheme', includeIosTheme)
    .replace('$includeMdTheme', includeMdTheme)
    .replace('$includeDarkTheme', includeDarkTheme)
    .replace('$includeLightTheme', includeLightTheme)
    .replace('$rtl', rtl);

  let cbs = 0;
  const componentsToProcess = components.filter((component) => {
    // eslint-disable-line
    return (
      fs.existsSync(
        path.resolve(__dirname, `../src/core/components/${component}/${component}.less`),
      ) && coreComponents.indexOf(component) < 0
    );
  });

  componentsToProcess.forEach(async (component) => {
    const lessContent = fs.readFileSync(
      path.resolve(__dirname, `../src/core/components/${component}/${component}.less`),
    );

    let cssContent;
    try {
      cssContent = await cleanCSS(
        await autoprefixer(
          await less(
            `${mainLess}\n${lessContent}`,
            path.resolve(__dirname, `../src/core/components/${component}/`),
          ),
        ),
      );
    } catch (err) {
      console.log(err);
    }
    fs.writeFileSync(
      path.resolve(output, `components/${component}/${component}${rtl ? '-rtl' : ''}.css`),
      cssContent,
    );

    cbs += 1;
    if (cbs === componentsToProcess.length && cb) cb();
  });
}

// Copy LESS
function copyLess(config, components, cb) {
  const output = `${getOutput()}/core`;
  const includeIosTheme = config.themes.indexOf('ios') >= 0;
  const includeMdTheme = config.themes.indexOf('md') >= 0;
  const includeDarkTheme = config.darkTheme;
  const includeLightTheme = config.lightTheme;
  const rtl = config.rtl;

  // Core LESS
  let lessContent = fs.readFileSync(path.resolve(__dirname, '../src/core/framework7.less'));
  lessContent = `${banner}\n${lessContent}`;
  lessContent = lessContent
    .replace('$includeIosTheme', includeIosTheme)
    .replace('$includeMdTheme', includeMdTheme)
    .replace('$includeDarkTheme', includeDarkTheme)
    .replace('$includeLightTheme', includeLightTheme)
    .replace('$rtl', rtl);

  fs.writeFileSync(`${output}/framework7.less`, lessContent);

  // Bundle LESS
  const lessBundleContent = lessContent.replace(
    '//IMPORT_COMPONENTS',
    components
      .map((component) => `@import './components/${component}/${component}.less';`)
      .join('\n'),
  );
  fs.writeFileSync(`${output}/framework7-bundle.less`, lessBundleContent);

  // copy less assets
  glob('**/*.*', { cwd: path.resolve(__dirname, '../src/core/less') }, (err, files) => {
    const filesToProcess = files.filter((file) => {
      return file.indexOf('.less') >= 0;
    });
    filesToProcess.forEach((file) => {
      let fileContent = fs.readFileSync(path.resolve(__dirname, '../src/core/less', file));
      fileContent = fileContent.replace(`@plugin './plugin.js';`, '');
      fs.writeFileSync(path.resolve(`${output}/less`, file), fileContent);
    });
  });

  if (cb) cb();
}
// Build CSS Bundle
async function buildBundle(config, components, themes, rtl, cb) {
  const env = process.env.NODE_ENV || 'development';
  const includeIosTheme = themes.indexOf('ios') >= 0;
  const includeMdTheme = themes.indexOf('md') >= 0;
  const includeDarkTheme = config.darkTheme;
  const includeLightTheme = config.lightTheme;
  const outputFileName = `framework7-bundle${rtl ? '-rtl' : ''}`;
  const output = `${getOutput()}/core`;

  let lessContent = fs.readFileSync(path.resolve(__dirname, '../src/core/framework7.less'));
  lessContent = lessContent
    .replace(
      '//IMPORT_COMPONENTS',
      components
        .map((component) => `@import url('./components/${component}/${component}.less');`)
        .join('\n'),
    )
    .replace('$includeIosTheme', includeIosTheme)
    .replace('$includeMdTheme', includeMdTheme)
    .replace('$includeDarkTheme', includeDarkTheme)
    .replace('$includeLightTheme', includeLightTheme)
    .replace('$rtl', rtl);

  let cssContent;
  try {
    cssContent = await autoprefixer(
      await less(lessContent, path.resolve(__dirname, '../src/core')),
    );
  } catch (err) {
    console.log(err);
  }

  // Write file
  fs.writeFileSync(`${output}/${outputFileName}.css`, `${banner}\n${cssContent}`);

  if (env === 'development') {
    if (cb) cb();
    return;
  }

  // Minified
  const minifiedContent = await cleanCSS(cssContent);

  // Write file
  fs.writeFileSync(`${output}/${outputFileName}.min.css`, `${banner}\n${minifiedContent}`);

  if (cb) cb();
}

// Build CSS Core
async function buildCore(themes, rtl, cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const includeIosTheme = themes.indexOf('ios') >= 0;
  const includeMdTheme = themes.indexOf('md') >= 0;
  const includeDarkTheme = config.darkTheme;
  const includeLightTheme = config.lightTheme;
  const output = `${getOutput()}/core`;

  let lessContent = fs.readFileSync(path.resolve(__dirname, '../src/core/framework7.less'));
  lessContent = lessContent
    .replace('//IMPORT_COMPONENTS', '')
    .replace('$includeIosTheme', includeIosTheme)
    .replace('$includeMdTheme', includeMdTheme)
    .replace('$includeDarkTheme', includeDarkTheme)
    .replace('$includeLightTheme', includeLightTheme)
    .replace('$rtl', rtl);

  let cssContent;
  try {
    cssContent = await autoprefixer(
      await less(lessContent, path.resolve(__dirname, '../src/core')),
    );
  } catch (e) {
    console.log(e);
  }

  // Write file
  fs.writeFileSync(`${output}/framework7${rtl ? '-rtl' : ''}.css`, `${banner}\n${cssContent}`);

  if (env === 'development') {
    if (cb) cb();
    return;
  }

  // Minified
  const minifiedContent = await cleanCSS(cssContent);

  // Write file
  fs.writeFileSync(
    `${output}/framework7${rtl ? '-rtl' : ''}.min.css`,
    `${banner}\n${minifiedContent}`,
  );

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
    if (cbs === (env === 'development' ? 3 : 6) && cb) cb();
  }

  // Build development version
  if (env === 'development') {
    buildComponentsStyles(components, false, onCb);
    buildBundle(config, components, config.themes, config.rtl, onCb);
    buildCore(config.themes, config.rtl, onCb);
    return;
  }

  // Build production
  buildComponentsStyles(components, false, onCb);
  buildComponentsStyles(components, true, onCb);
  buildBundle(config, components, config.themes, false, onCb);
  buildBundle(config, components, config.themes, true, onCb);
  buildCore(config.themes, false, onCb);
  buildCore(config.themes, true, onCb);
}

module.exports = buildLess;

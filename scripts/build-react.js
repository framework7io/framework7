/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const fs = require('fs');
const bannerReact = require('./banner-react');

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
  const buildPath = env === 'development' ? './build' : './dist';

  /* Replace plugin vars */
  let pluginContent = fs.readFileSync(`./${buildPath}/react/utils/plugin.js`, 'utf-8');

  pluginContent = pluginContent
    .replace('// IMPORT_LIBRARY', 'import React from \'react\';')
    .replace('// IMPORT_COMPONENTS\n', '')
    .replace('// REGISTER_COMPONENTS\n', '')
    .replace(/EXTEND/g, 'React.Component')
    .replace(/COMPILER/, '\'react\'')
    .replace(/REFS_PROP/, '\'refs\'');

  /* Build main components esm module */
  const files = fs.readdirSync(`${buildPath}/react/components`);
  const componentImports = [];
  const componentAliases = [];
  const componentExports = [];

  files.forEach((fileName) => {
    const componentName = fileName
      .replace('.js', '')
      .split('-')
      .map(word => word[0].toUpperCase() + word.substr(1))
      .join('');
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
  fs.writeFileSync(`${buildPath}/react/utils/plugin.js`, pluginContent);

  if (cb) cb();
}

module.exports = buildReact;

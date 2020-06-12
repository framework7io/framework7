const path = require('path');
const fs = require('./utils/fs-extra');
const getOutput = require('./get-output');
const bannerSvelte = require('./banners/svelte');

function esm({ banner, componentImports, componentExports }) {
  return `
${banner}

${componentImports.join('\n')}
import Framework7Svelte, { f7, f7ready, theme } from './utils/plugin';

export {\n${componentExports.join(',\n')}\n};

export { f7, f7ready, theme };

export default Framework7Svelte;
  `.trim();
}

function buildSvelte(cb) {
  const output = path.resolve(getOutput(), 'svelte');
  const components = [];
  const componentImports = [];
  const componentExports = [];

  // Copy components
  const componentsSrc = path.resolve('./src/svelte/components');
  fs
    .readdirSync(componentsSrc)
    .filter(f => f.indexOf('.svelte') >= 0)
    .forEach((fileName) => {
      const componentName = fileName
        .replace('.svelte', '')
        .split('-')
        .map(word => word[0].toUpperCase() + word.substr(1))
        .join('');
      components.push({
        name: `${componentName}`,
      });
      componentImports.push(`import ${componentName} from './components/${fileName}';`);
      componentExports.push(`  ${componentName}`);

      fs.copyFileSync(path.resolve(componentsSrc, fileName), path.resolve(output, 'components', fileName));
    });

  // Copy utils
  const phenomeUtilsSrc = path.resolve('./src/phenome/utils');
  fs
    .readdirSync(phenomeUtilsSrc)
    .forEach((fileName) => {
      fs.copyFileSync(path.resolve(phenomeUtilsSrc, fileName), path.resolve(output, 'utils', fileName));
    });
  const svelteUtilsSrc = path.resolve('./src/svelte/utils');
  fs
    .readdirSync(svelteUtilsSrc)
    .forEach((fileName) => {
      fs.copyFileSync(path.resolve(svelteUtilsSrc, fileName), path.resolve(output, 'utils', fileName));
    });

  // Tweak utils
  let pluginContent = fs.readFileSync(path.resolve(output, 'utils/plugin.js'), 'utf8');
  pluginContent = pluginContent
    .replace('// IMPORT_LIBRARY\n', '')
    .replace('// IMPORT_COMPONENTS\n', '')
    .replace('// REGISTER_COMPONENTS\n', '')
    .replace('const Extend = EXTEND;\n', '');
  pluginContent = pluginContent
    .split(/\/\/ DEFINE_INSTANCE_PROTOS_START\n|\/\/ DEFINE_INSTANCE_PROTOS_END\n/)
    .filter((part, index) => index !== 1)
    .join('')
    .split(/\/\/ DEFINE_PROTOS_START|\/\/ DEFINE_PROTOS_END/)
    .filter((part, index) => index !== 1)
    .join('');
  pluginContent = pluginContent
    .replace(/\n[ ]*\n/g, '\n');

  fs.writeFileSync(path.resolve(output, 'utils/plugin.js'), pluginContent);

  // Create plugin
  const componentsContent = esm({
    banner: bannerSvelte.trim(),
    componentImports,
    componentExports,
  });
  fs.writeFileSync(`${output}/framework7-svelte.esm.js`, componentsContent);

  cb();
}

module.exports = buildSvelte;

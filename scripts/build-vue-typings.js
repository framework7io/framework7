/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: "off" */

const path = require('path');
const getOutput = require('./get-output');
const fs = require('./utils/fs-extra');

const importLib = `
import Vue from 'vue';
`.trim();

const libExtension = `
declare module 'vue/types/vue' {
  interface Vue extends Partial<Framework7Extensions> {}
}
`.trim();

const declarePlugin = `
declare const Framework7Vue: Framework7Plugin;
`.trim();

const exportPlugin = `
export default Framework7Vue;
`.trim();

function buildTypings(cb) {
  const output = `${getOutput()}/vue`;

  const files = fs.readdirSync(`${output}/components`).filter(file => file.indexOf('.d.ts') < 0);

  const components = [];
  const componentImports = [];
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
    componentImports.push(`import f7${componentName} from './components/${fileName.replace('.js', '')}';`);
    componentExports.push(`  f7${componentName}`);
  });

  let vueTypings = fs.readFileSync(path.resolve(__dirname, '../src/phenome/framework7-phenome.d.ts'));
  vueTypings = vueTypings
    .replace('// IMPORT_LIB', importLib)
    .replace('// IMPORT_COMPONENTS', componentImports.join('\n'))
    .replace('// LIB_EXTENSION', libExtension)
    .replace('// EXPORT_COMPONENTS', `export {\n${componentExports.join(',\n')}\n}`)
    .replace('// DECLARE_PLUGIN', declarePlugin)
    .replace('// EXPORT_PLUGIN', exportPlugin);

  fs.writeFileSync(`${output}/framework7-vue.d.ts`, vueTypings);
  fs.writeFileSync(`${output}/framework7-vue.bundle.d.ts`, vueTypings);
  fs.writeFileSync(`${output}/framework7-vue.esm.d.ts`, vueTypings);
  fs.writeFileSync(`${output}/framework7-vue.esm.bundle.d.ts`, vueTypings);

  cb();
}

module.exports = buildTypings;

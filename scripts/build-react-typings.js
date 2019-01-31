/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: "off" */

const path = require('path');
const getOutput = require('./get-output');
const fs = require('./utils/fs-extra');

const importLib = `
import * as React from 'react';
`.trim();

const libExtension = `
declare module 'react' {
  interface Component extends Partial<Framework7Extensions> {}
}
`.trim();

const declarePlugin = `
declare const Framework7React: Framework7Plugin;
`.trim();

const exportPlugin = `
export default Framework7React;
`.trim();

function buildTypings(cb) {
  const output = `${getOutput()}/react`;

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
    componentImports.push(`import F7${componentName} from './components/${fileName.replace('.js', '')}';`);
    componentExports.push(`  F7${componentName}`, `  F7${componentName} as ${componentName}`);
  });

  let reactTypings = fs.readFileSync(path.resolve(__dirname, '../src/phenome/framework7-phenome.d.ts'));
  reactTypings = reactTypings
    .replace('// IMPORT_LIB', importLib)
    .replace('// IMPORT_COMPONENTS', componentImports.join('\n'))
    .replace('// LIB_EXTENSION', libExtension)
    .replace('// EXPORT_COMPONENTS', `export {\n${componentExports.join(',\n')}\n}`)
    .replace('// DECLARE_PLUGIN', declarePlugin)
    .replace('// EXPORT_PLUGIN', exportPlugin);

  fs.writeFileSync(`${output}/framework7-react.d.ts`, reactTypings);
  fs.writeFileSync(`${output}/framework7-react.bundle.d.ts`, reactTypings);
  fs.writeFileSync(`${output}/framework7-react.esm.d.ts`, reactTypings);

  cb();
}

module.exports = buildTypings;

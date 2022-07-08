/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: "off" */

const getOutput = require('./get-output.js');
const fs = require('./utils/fs-extra.js');
const { COLOR_PROPS, ICON_PROPS, ROUTER_PROPS, ACTIONS_PROPS } = require('./ts-extend-props.js');

function generateComponentProps(propsContent) {
  // eslint-disable-next-line
  const props = {};
  propsContent
    .trim()
    .replace('COLOR_PROPS', COLOR_PROPS)
    .replace('ICON_PROPS', ICON_PROPS)
    .replace('ROUTER_PROPS', ROUTER_PROPS)
    .replace('ACTIONS_PROPS', ACTIONS_PROPS)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .forEach((line) => {
      const propName = line.split(':')[0].replace('?', '');
      let propValue = line.split(':').slice(1).join(':');
      if (propValue.charAt(propValue.length - 1) === ';') {
        propValue = propValue.substr(0, propValue.length - 1);
      }
      props[propName] = propValue.trim();
    });
  const content = Object.keys(props)
    .map((propName) => `${propName}?: ${props[propName]};`)
    .join('\n  ');
  return content;
}

function generateComponentTypings(componentName, fileContent) {
  if (componentName.includes('Swiper') || componentName.includes('Skeleton')) return fileContent;
  let imports = '';
  let props = '';
  let propsExtends = '';
  if (fileContent.indexOf('/* dts-imports') >= 0) {
    imports = fileContent.split('/* dts-imports')[1].split('*/')[0] || '';
  }
  if (fileContent.indexOf('/* dts-props') >= 0) {
    props = fileContent.split('/* dts-props')[1].split('*/')[0] || '';
  }
  if (fileContent.indexOf('/* dts-extends') >= 0) {
    propsExtends = fileContent.split('/* dts-extends')[1].split('*/')[0] || '';
  }
  return `
import * as React from 'react';
// IMPORTS

export interface ${componentName}Props${propsExtends ? ` extends ${propsExtends.trim()}` : ''} {
  slot?: string;
  // PROPS
}
declare const ${componentName}: React.FunctionComponent<${componentName}Props>;

export default ${componentName};
  `
    .replace('// IMPORTS', imports)
    .replace('// PROPS', generateComponentProps(props));
}

function buildTypings(cb) {
  const output = `${getOutput()}/react`;

  const files = fs.readdirSync('src/react/components').filter((file) => file.indexOf('.d.ts') < 0);
  const componentImports = [];
  const componentExports = [];

  files.forEach((fileName) => {
    const componentName = fileName
      .replace('.jsx', '')
      .split('-')
      .map((word) => word[0].toUpperCase() + word.substr(1))
      .join('');
    const fileBase = fileName.replace('.jsx', '');
    componentImports.push(`import ${componentName} from './components/${fileBase}.js';`);
    componentExports.push(componentName);

    const typingsContent = generateComponentTypings(
      componentName,
      fs.readFileSync(`src/react/components/${fileName}`, 'utf-8'),
    );

    fs.writeFileSync(`${output}/components/${fileBase}.d.ts`, typingsContent);
  });

  const mainTypings = fs
    .readFileSync('src/react/framework7-react.d.ts', 'utf-8')
    .replace('// IMPORT_COMPONENTS', componentImports.join('\n'))
    .replace('// EXPORT_COMPONENTS', `export { ${componentExports.join(', ')} }`);

  fs.writeFileSync(`${output}/framework7-react.d.ts`, mainTypings);

  if (cb) cb();
}

module.exports = buildTypings;

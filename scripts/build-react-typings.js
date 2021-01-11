/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: "off" */

const getOutput = require('./get-output');
const fs = require('./utils/fs-extra');

const COLOR_PROPS = `
color?: string;
colorTheme?: string;
textColor?: string;
bgColor?: string;
borderColor?: string;
rippleColor?: string;
themeDark?: boolean;
`;

const ICON_PROPS = `
icon?: string;
iconMaterial?: string;
iconF7?: string;
iconIos?: string;
iconMd?: string;
iconAurora?: string;
iconColor?: string;
iconSize?: string | number;
`;

const ROUTER_PROPS = `
back?: boolean;
external?: boolean;
force?: boolean;
animate?: boolean;
ignoreCache?: boolean;
reloadCurrent?: boolean;
reloadAll?: boolean;
reloadPrevious?: boolean;
reloadDetail?: boolean;
routeTabId?: string;
view?: string;
routeProps?: any;
preventRouter?: boolean;
transition?: string;
openIn?: string;
`;

const ACTIONS_PROPS = `
searchbarEnable?: boolean | string;
searchbarDisable?: boolean | string;
searchbarClear?: boolean | string;
searchbarToggle?: boolean | string;
panelOpen?: boolean | string;
panelClose?: boolean | string;
panelToggle?: boolean | string;
popupOpen?: boolean | string;
popupClose?: boolean | string;
actionsOpen?: boolean | string;
actionsClose?: boolean | string;
popoverOpen?: boolean | string;
popoverClose?: boolean | string;
loginScreenOpen?: boolean | string;
loginScreenClose?: boolean | string;
sheetOpen?: boolean | string;
sheetClose?: boolean | string;
sortableEnable?: boolean | string;
sortableDisable?: boolean | string;
sortableToggle?: boolean | string;
cardOpen?: boolean | string;
cardPreventOpen?: boolean | string;
cardClose?: boolean | string;
menuClose?: boolean | string;
`;

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

interface ${componentName}Props${propsExtends ? ` extends ${propsExtends.trim()}` : ''} {
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
    componentImports.push(`import ${componentName} from './components/${fileBase}';`);
    componentExports.push(componentName);

    const typingsContent = generateComponentTypings(
      componentName,
      fs.readFileSync(`src/react/components/${fileName}`, 'utf-8'),
    );

    fs.writeFileSync(`${output}/components/${fileBase}/${fileBase}.d.ts`, typingsContent);
  });

  const mainTypings = fs
    .readFileSync('src/react/framework7-react.d.ts', 'utf-8')
    .replace('// IMPORT_COMPONENTS', componentImports.join('\n'))
    .replace('// EXPORT_COMPONENTS', `export { ${componentExports.join(', ')} }`);

  fs.writeFileSync(`${output}/framework7-react.d.ts`, mainTypings);

  if (cb) cb();
}

module.exports = buildTypings;

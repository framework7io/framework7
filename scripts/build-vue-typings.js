/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: "off" */

const getOutput = require('./get-output.js');
const fs = require('./utils/fs-extra.js');
const { COLOR_PROPS, ICON_PROPS, ROUTER_PROPS, ACTIONS_PROPS } = require('./ts-extend-props.js');

const extendMap = {
  colorProps: COLOR_PROPS,
  iconProps: ICON_PROPS,
  routerProps: ROUTER_PROPS,
  actionsProps: ACTIONS_PROPS,
};

function generateComponentEvents(fileContent) {
  if (!fileContent.includes('emits: [')) return '';
  let events;
  fileContent.replace(/emits: \[([^\]]*)\]/, (str, eventsString) => {
    events = eventsString
      .split(',')
      .map((ev) => ev.replace(/'/g, '').trim())
      .filter((ev) => !!ev);
  });
  if (events && events.length) {
    return [
      `(${events.map((ev) => `"${ev}"`).join(' | ')})[]`,
      `${events.map((ev) => `"${ev}"`).join(' | ')}`,
    ].join(',\n  ');
  }
  return '';
}

function generateComponentProps(fileContent) {
  // eslint-disable-next-line
  let propsContent = fileContent.match(/props\:\ {([^ъ]*)},\n  (emits|setup)/g);
  if (propsContent && propsContent[0]) {
    propsContent = propsContent[0]
      .replace('props: {', '')
      .replace('},\n  emits', '')
      .replace('},\n  setup', '');
  }
  if (!propsContent) {
    return '';
  }
  const props = [];
  const extendWith = [];
  (propsContent.match(/\.\.\.([a-zA-Z]*)/g) || []).forEach((prop) => {
    extendWith.push(prop.replace('...', ''));
  });

  const getType = (str) => {
    if (str.includes('['))
      str = str
        // eslint-disable-next-line
        .replace(/[\[\]]*/g, '')
        .split(', ')
        .map((t) => t.replace(',', ''));
    else if (str.includes(',')) str = str.replace(',', '');
    return str;
  };

  // eslint-disable-next-line
  propsContent.replace(/\n    ([a-zA-Z0-9]*): ([\[\], a-zA-Z0-9]*)/g, (str, name, type) => {
    if (!type) return;
    props.push({ name, type: getType(type) });
  });

  // eslint-disable-next-line
  propsContent.replace(/\n    ([a-zA-Z0-9]*): {([^ъ^\}]*)}/g, (str1, name, typeObj) => {
    const prop = { name };
    // eslint-disable-next-line
    typeObj.replace(/type: ([\[\], a-zA-Z0-9]*)/, (str2, typeStr) => {
      prop.type = getType(typeStr);
    });
    if (typeObj.includes('default: ')) {
      prop.default = typeObj.split('default: ')[1].replace(',\n', '').trim();
    }
    props.push(prop);
  });

  const toVueType = (type) => {
    if (type === 'string') return 'String';
    if (type === 'boolean') return 'Boolean';
    if (type === 'number') return 'Number';
    if (type === 'any') return 'Object';
    return '';
  };

  extendWith.forEach((extendGroup) => {
    extendMap[extendGroup]
      .trim()
      .split('\n')
      .forEach((propsRow) => {
        // eslint-disable-next-line
        let [name, type] = propsRow.replace(/;/, '').split('?: ');
        if (type.includes(' | ')) {
          type = type.split(' | ').map(toVueType);
        } else {
          type = toVueType(type);
        }
        props.push({ name, type });
      });
  });

  const getVueType = ({ type }) => {
    const plainType = (t) => {
      if (t === 'String') return 'StringConstructor';
      if (t === 'Boolean') return 'BooleanConstructor';
      if (t === 'Number') return 'NumberConstructor';
      if (t === 'Function') return 'FunctionConstructor';
      if (t === 'Object') return 'ObjectConstructor';
      if (t === 'Array') return 'ArrayConstructor';
      return 'any';
    };
    if (typeof type === 'string') {
      return plainType(type);
    }
    return type.map(plainType).join(' | ');
  };

  const getVueDefault = (prop) => {
    if ('default' in prop) {
      const value = prop.default;
      if (value.includes("'")) return 'string';
      if (value === 'true' || value === 'false') return 'boolean';
      if (!Number.isNaN(parseFloat(value))) return 'number';
      return `${prop.default}`;
    }
    return '';
  };

  return props
    .map((prop) => {
      const defaultValue = getVueDefault(prop);
      return `
    ${prop.name}: {
      type: ${getVueType(prop)};${defaultValue ? `\n      default: ${defaultValue};` : ''}
    }`;
    })
    .join(',\n');
}

function generateComponentTypings(componentName, fileContent) {
  if (componentName.includes('Swiper') || componentName.includes('Skeleton')) {
    return fileContent.replace('<script>', '').replace('</script>', '');
  }

  return `
import { ComponentOptionsMixin, DefineComponent, PropType } from 'vue';
// IMPORTS

declare const ${componentName}: DefineComponent<
  {
    // PROPS
  },
  () => JSX.Element,
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  // EVENTS
>;

export default ${componentName};
  `
    .replace('// IMPORTS', '')
    .replace('// PROPS', generateComponentProps(fileContent))
    .replace('// EVENTS', generateComponentEvents(fileContent));
}

function buildTypings(cb) {
  const output = `${getOutput()}/vue`;

  const files = fs.readdirSync('src/vue/components').filter((file) => file.indexOf('.d.ts') < 0);
  const componentImports = [];
  const componentExports = [];

  files.forEach((fileName) => {
    const componentName = fileName
      .replace('.vue', '')
      .split('-')
      .map((word) => word[0].toUpperCase() + word.substr(1))
      .join('');
    const fileBase = fileName.replace('.vue', '');
    componentImports.push(`import f7${componentName} from './components/${fileBase}.js';`);
    componentExports.push(`f7${componentName}`);

    const typingsContent = generateComponentTypings(
      componentName,
      fs.readFileSync(`src/vue/components/${fileName}`, 'utf-8'),
    );

    fs.writeFileSync(`${output}/components/${fileBase}.d.ts`, typingsContent);
  });

  const mainTypings = fs
    .readFileSync('src/vue/framework7-vue.d.ts', 'utf-8')
    .replace('// IMPORT_COMPONENTS', componentImports.join('\n'))
    .replace('// EXPORT_COMPONENTS', `export { ${componentExports.join(', ')} }`);

  fs.writeFileSync(`${output}/framework7-vue.d.ts`, mainTypings);

  if (cb) cb();
}

module.exports = buildTypings;

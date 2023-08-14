/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: "off" */

const getOutput = require('./get-output.js');
const fs = require('./utils/fs-extra.js');
const { COLOR_PROPS, ICON_PROPS, ROUTER_PROPS, ACTIONS_PROPS } = require('./ts-extend-props.js');

const TEMPLATE = `
import { SvelteComponent } from 'svelte';
import { HTMLAttributes } from 'svelte/elements';
{{IMPORTS}}

interface {{componentName}}Props {
  {{PROPS}}
}

{{EXTENDS}}

declare class {{componentName}} extends SvelteComponent<
  {{componentName}}Props & Omit<HTMLAttributes<HTMLElementTagNameMap['div']>, keyof {{componentName}}Props>,
  { {{EVENTS}} },
  { {{SLOTS}} }
> {}

export { {{componentName}}Props };
export default {{componentName}};
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
  ['id', 'style', 'className', 'ref', 'slot', 'children'].forEach((key) => {
    delete props[key];
  });
  const content = Object.keys(props)
    .map((propName) => `${propName}?: ${props[propName]};`)
    .join('\n  ');
  return content;
}

function generateComponentTypings(componentName, fileContent, reactFileContent) {
  if (componentName.includes('Swiper') || componentName.includes('Skeleton')) return fileContent;
  let imports = '';
  let props = '';
  let propsExtends = '';
  if (reactFileContent.indexOf('/* dts-imports') >= 0) {
    imports = reactFileContent.split('/* dts-imports')[1].split('*/')[0] || '';
  }
  if (reactFileContent.indexOf('/* dts-props') >= 0) {
    props = reactFileContent.split('/* dts-props')[1].split('*/')[0] || '';
  }
  if (reactFileContent.indexOf('/* dts-extends') >= 0) {
    propsExtends = reactFileContent.split('/* dts-extends')[1].split('*/')[0] || '';
  }
  const slots = [];
  fileContent.replace(/<slot ([^>]*)\/>/g, (str, name) => {
    if (!name.trim()) name = 'default';
    name = name.match(/name="([a-z-]*)"/);
    if (name) name = name[1];
    else name = 'default';
    if (!slots.includes(name)) slots.push(name);
  });
  if (fileContent.includes('<slot') && !slots.includes('default')) slots.push('default');
  const slotsContent = slots.map((slot) => ` '${slot}' : {};`).join(' ');

  const events = [];
  fileContent.replace(/emit\('([a-zA-Z]*)'/g, (str, name) => {
    if (!events.includes(name)) events.push(name);
  });
  const eventsContent = events.map((event) => `${event}: CustomEvent<void>;`).join(' ');

  // prettier-ignore
  return TEMPLATE
    .replace('{{IMPORTS}}', imports)
    .replace('{{EXTENDS}}', propsExtends ? ` interface ${componentName}Props extends ${propsExtends.trim()} {}` : '')
    .replace('{{PROPS}}', generateComponentProps(props))
    .replace('{{EVENTS}}', eventsContent)
    .replace('{{SLOTS}}', slotsContent)
    .replace(/{{componentName}}/g, componentName)
}

function buildTypings(cb) {
  const output = `${getOutput()}/svelte`;

  const files = fs.readdirSync('src/svelte/components').filter((file) => file.indexOf('.d.ts') < 0);
  const componentImports = [];
  const componentExports = [];

  files.forEach((fileName) => {
    const componentName = fileName
      .replace('.svelte', '')
      .replace('.js', '')
      .split('-')
      .map((word) => word[0].toUpperCase() + word.substr(1))
      .join('');
    const fileBase = fileName.replace('.svelte', '').replace('.js', '');
    componentImports.push(`import ${componentName} from './components/${fileBase}.js';`);
    componentExports.push(componentName);

    let reactContent;
    try {
      reactContent = fs.readFileSync(
        `src/react/components/${fileName.replace('.svelte', '.jsx')}`,
        'utf-8',
      );
    } catch (err) {
      reactContent = '';
    }
    const typingsContent = generateComponentTypings(
      componentName,
      fs.readFileSync(`src/svelte/components/${fileName}`, 'utf-8'),
      reactContent,
    );

    fs.writeFileSync(`${output}/components/${fileBase}.d.ts`, typingsContent);
  });

  const mainTypings = fs
    .readFileSync('src/svelte/framework7-svelte.d.ts', 'utf-8')
    .replace('// IMPORT_COMPONENTS', componentImports.join('\n'))
    .replace('// EXPORT_COMPONENTS', `export { ${componentExports.join(', ')} }`);

  fs.writeFileSync(`${output}/framework7-svelte.d.ts`, mainTypings);

  if (cb) cb();
}

module.exports = buildTypings;

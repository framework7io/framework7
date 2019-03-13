/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const path = require('path');
const getOutput = require('./get-output.js');
const fs = require('./utils/fs-extra');

function capitalize(name) {
  return name.split('-').map((word) => { // eslint-disable-line
    return word.split('').map((char, index) => {
      if (index === 0) return char.toUpperCase();
      return char;
    }).join('');
  }).join('');
}

function generateTypings(basePath, modules, components) {
  const f7Base = `import Framework7 from '${basePath}/components/app/app-class'`;

  const helpers = ['request', 'utils', 'support', 'device'];

  const importHelpers = helpers.map((helper) => {
    const capitalized = capitalize(helper);
    return `import ${capitalized} from '${basePath}/utils/${helper}';`;
  });

  const exportHelpers = helpers.map(capitalize).join(', ');

  const importModules = modules.map((f7Module) => {
    const capitalized = capitalize(f7Module);
    return `import {${capitalized} as ${capitalized}Namespace} from '${basePath}/modules/${f7Module}/${f7Module}';`;
  });

  const importComponents = components.map((component) => {
    const capitalized = capitalize(component);
    return `import {${capitalized} as ${capitalized}Namespace} from '${basePath}/components/${component}/${component}';`;
  });

  const install = [...modules, ...components].map((f7Module) => {
    const capitalized = capitalize(f7Module);
    return [
      `interface Framework7Class<Events> extends ${capitalized}Namespace.AppMethods{}`,
      `interface Framework7Params extends ${capitalized}Namespace.AppParams{}`,
      `interface Framework7Events extends ${capitalized}Namespace.AppEvents{}`,
    ].join('\n  ');
  });

  return fs.readFileSync(path.resolve(__dirname, '../src/core/framework7.d.ts'))
    .replace(/{{basePath}}/g, basePath)
    .replace(/\/\/ IMPORT_BASE/, f7Base)
    .replace(/\/\/ IMPORT_HELPERS/, importHelpers.join('\n'))
    .replace(/\/\/ EXPORT_HELPERS/, `export { ${exportHelpers} };`)
    .replace(/\/\/ IMPORT_MODULES/, importModules.join('\n'))
    .replace(/\/\/ IMPORT_COMPONENTS/, importComponents.join('\n'))
    .replace(/\/\/ INSTALL/, install.join('\n  '));
}

function buildTypings(cb) {
  const output = `${getOutput()}/core`;

  const modules = fs.readdirSync('./src/core/modules').filter((file) => {
    if (file[0] === '.') return false;
    return fs.existsSync(`./src/core/modules/${file}/${file}.d.ts`);
  });
  const components = fs.readdirSync('./src/core/components').filter((file) => {
    if (file[0] === '.') return false;
    return fs.existsSync(`./src/core/components/${file}/${file}.d.ts`);
  });

  const rootTypings = generateTypings('.', modules, components);
  const jsTypings = generateTypings('..', modules, components);

  fs.writeFileSync(`${output}/js/framework7.d.ts`, jsTypings);
  fs.writeFileSync(`${output}/js/framework7.bundle.d.ts`, jsTypings);
  fs.writeFileSync(`${output}/framework7.esm.d.ts`, rootTypings);
  fs.writeFileSync(`${output}/framework7.esm.bundle.d.ts`, rootTypings);

  cb();
}

module.exports = buildTypings;

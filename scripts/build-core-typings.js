/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const fs = require('fs');
const path = require('path');
const getOutput = require('./get-output.js');
const writeFileSync = require('./utils/write-file-sync');

function capitalize(name) {
  return name.split('-').map((word) => { // eslint-disable-line
    return word.split('').map((char, index) => {
      if (index === 0) return char.toUpperCase();
      return char;
    }).join('');
  }).join('');
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

  const importModules = modules.map((f7Module) => {
    const capitalized = capitalize(f7Module);
    return `import {${capitalized} as ${capitalized}Namespace} from './modules/${f7Module}/${f7Module}';`;
  });

  const importComponents = components.map((component) => {
    const capitalized = capitalize(component);
    return `import {${capitalized} as ${capitalized}Namespace} from './components/${component}/${component}';`;
  });

  const install = [...modules, ...components].map((f7Module) => {
    const capitalized = capitalize(f7Module);
    return [
      `interface Framework7Class<Events> extends ${capitalized}Namespace.AppMethods{}`,
      `interface Framework7Params extends ${capitalized}Namespace.AppParams{}`,
      `interface Framework7Events extends ${capitalized}Namespace.AppEvents{}`,
    ].join('\n  ');
  });

  const typings = fs.readFileSync(path.resolve(__dirname, '../src/core/framework7.d.ts'), 'utf8')
    .replace(/\/\/ IMPORT_MODULES/, importModules.join('\n'))
    .replace(/\/\/ IMPORT_COMPONENTS/, importComponents.join('\n'))
    .replace(/\/\/ INSTALL/, install.join('\n  '));

  writeFileSync(`${output}/js/framework7.d.ts`, typings);
  writeFileSync(`${output}/js/framework7.bundle.d.ts`, typings);
  writeFileSync(`${output}/framework7.esm.d.ts`, typings);
  writeFileSync(`${output}/framework7.esm.bundle.d.ts`, typings);

  cb();
}

module.exports = buildTypings;

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const path = require('path');
const glob = require('glob');
const getOutput = require('./get-output.js');
const fs = require('./utils/fs-extra.js');

function capitalize(name) {
  return name
    .split('-')
    .map((word) => {
      // eslint-disable-line
      return word
        .split('')
        .map((char, index) => {
          if (index === 0) return char.toUpperCase();
          return char;
        })
        .join('');
    })
    .join('');
}

function copyTypings() {
  const output = `${getOutput()}/core`;
  ['modules', 'components', 'shared'].forEach((folderName) => {
    glob('**/*.*', { cwd: path.resolve(__dirname, `../src/core/${folderName}`) }, (err, files) => {
      const filesToProcess = files.filter((file) => {
        return file.indexOf('.d.ts') >= 0;
      });
      filesToProcess.forEach((file) => {
        const fileContent = fs.readFileSync(
          path.resolve(__dirname, `../src/core/${folderName}`, file),
        );
        fs.writeFileSync(path.resolve(`${output}/${folderName}`, file), fileContent);
      });
    });
  });
}

function generateTypings(content, modules, components) {
  const f7Base = `import Framework7 from './components/app/app-class.js'`;

  const helpers = ['utils', 'support', 'device'];

  const importHelpers = helpers.map((helper) => {
    const capitalized = capitalize(helper);
    return `import ${capitalized} from './shared/${helper}';`;
  });

  const exportHelpers = helpers.map(capitalize).join(', ');

  const importModules = modules.map((f7Module) => {
    const capitalized = capitalize(f7Module);
    return `import { ${capitalized} as ${capitalized}Module } from './modules/${f7Module}/${f7Module}.js';`;
  });

  const importComponents = components.map((component) => {
    const capitalized = capitalize(component);
    return `import { ${capitalized} } from './components/${component}/${component}.js';`;
  });

  const installModules = modules
    .map((f7Module) => {
      const capitalized = capitalize(f7Module);
      return [
        `interface Framework7Class<Events> extends ${capitalized}Module.AppMethods{}`,
        `interface Framework7Parameters extends ${capitalized}Module.AppParams{}`,
        `interface Framework7Events extends ${capitalized}Module.AppEvents{}`,
      ].join('\n  ');
    })
    .join('\n  ');

  const installComponents = components
    .map((f7Module) => {
      const capitalized = capitalize(f7Module);
      return [
        `interface Framework7Class<Events> extends ${capitalized}.AppMethods{}`,
        `interface Framework7Parameters extends ${capitalized}.AppParams{}`,
        `interface Framework7Events extends ${capitalized}.AppEvents{}`,
      ].join('\n  ');
    })
    .join('\n  ');

  const install = [installModules, `  ${installComponents}`].join('\n');

  const exportComponents = components
    .map((f7Module) => {
      return capitalize(f7Module);
    })
    .join(', ');

  return content
    .replace(/\/\/ IMPORT_BASE/, f7Base)
    .replace(/\/\/ IMPORT_HELPERS/, importHelpers.join('\n'))
    .replace(/\/\/ EXPORT_HELPERS/, `export { ${exportHelpers} };`)
    .replace(/\/\/ IMPORT_MODULES/, importModules.join('\n'))
    .replace(/\/\/ IMPORT_COMPONENTS/, importComponents.join('\n'))
    .replace(/\/\/ INSTALL/, install)
    .replace(/\/\/ EXPORT_COMPONENTS/, `export { ${exportComponents} }`);
}

function buildTypings(cb) {
  copyTypings();

  const output = `${getOutput()}/core`;

  const modules = fs.readdirSync('./src/core/modules').filter((file) => {
    if (file[0] === '.') return false;
    return fs.existsSync(`./src/core/modules/${file}/${file}.d.ts`);
  });
  const components = fs.readdirSync('./src/core/components').filter((file) => {
    if (file[0] === '.') return false;
    return fs.existsSync(`./src/core/components/${file}/${file}.d.ts`);
  });

  const mainContent = fs.readFileSync(path.resolve(__dirname, '../src/core/framework7.d.ts'));
  const typesContent = fs.readFileSync(
    path.resolve(__dirname, '../src/core/framework7-types.d.ts'),
  );

  const mainTypings = generateTypings(mainContent, modules, components);
  const typesTypings = generateTypings(typesContent, modules, components).replace(
    /\.\/types\//g,
    './',
  );

  fs.writeFileSync(`${output}/framework7.d.ts`, mainTypings);
  fs.writeFileSync(`${output}/framework7-types.d.ts`, typesTypings);

  cb();
}

module.exports = buildTypings;

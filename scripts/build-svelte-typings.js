/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: "off" */

const getOutput = require('./get-output');
const fs = require('./utils/fs-extra');

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
    componentImports.push(`import ${componentName} from './components/${fileBase}';`);
    componentExports.push(componentName);
  });

  const mainTypings = fs
    .readFileSync('src/svelte/framework7-svelte.d.ts', 'utf-8')
    .replace('// IMPORT_COMPONENTS', componentImports.join('\n'))
    .replace('// EXPORT_COMPONENTS', `export { ${componentExports.join(', ')} }`);

  fs.writeFileSync(`${output}/framework7-svelte.d.ts`, mainTypings);

  if (cb) cb();
}

module.exports = buildTypings;

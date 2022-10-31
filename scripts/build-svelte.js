/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["off"] */

const exec = require('exec-sh');
const bannerSvelte = require('./banners/svelte.js');
const getOutput = require('./get-output.js');
const fs = require('./utils/fs-extra.js');

// Build Svelte
async function buildSvelte(cb) {
  const buildPath = getOutput();

  const files = fs.readdirSync('src/svelte/components').filter((file) => file.indexOf('.d.ts') < 0);
  const svelteShared = fs
    .readdirSync('src/svelte/shared')
    .filter((file) => file.indexOf('.svelte') > 0);
  const componentImports = [];
  const componentExports = [];
  const svelteComponents = [];

  files.forEach((fileName) => {
    const componentName = fileName
      .replace('.svelte', '')
      .replace('.js', '')
      .split('-')
      .map((word) => word[0].toUpperCase() + word.substr(1))
      .join('');
    componentImports.push(`import ${componentName} from './components/${fileName}';`);
    componentExports.push(componentName);
    if (fileName.includes('.svelte')) svelteComponents.push(fileName);
  });

  const pluginContent = fs
    .readFileSync('src/svelte/framework7-svelte.js', 'utf-8')
    .replace('// IMPORT_COMPONENTS', componentImports.join('\n'))
    .replace('// EXPORT_COMPONENTS', `export { ${componentExports.join(', ')} }`);

  await exec.promise(
    `npx cross-env MODULES=esm npx babel --config-file ./babel-svelte.config.js src/svelte --out-dir ${buildPath}/svelte --ignore "src/svelte/framework7-svelte.js","*.svelte"`,
  );

  fs.writeFileSync(`${buildPath}/svelte/framework7-svelte.js`, pluginContent);

  // Copy svelte components
  svelteComponents.forEach((fileName) => {
    fs.copyFileSync(
      `src/svelte/components/${fileName}`,
      `${buildPath}/svelte/components/${fileName}`,
    );
  });
  svelteShared.forEach((fileName) => {
    fs.copyFileSync(`src/svelte/shared/${fileName}`, `${buildPath}/svelte/shared/${fileName}`);
  });

  const esmContent = fs.readFileSync(`${buildPath}/svelte/framework7-svelte.js`, 'utf-8');

  fs.writeFileSync(
    `${buildPath}/svelte/framework7-svelte.js`,
    `${bannerSvelte.trim()}\n${esmContent}`,
  );

  if (cb) cb();
}

module.exports = buildSvelte;

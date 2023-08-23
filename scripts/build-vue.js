/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["off"] */

const path = require('path');
const exec = require('exec-sh');
const bannerVue = require('./banners/vue.js');
const getOutput = require('./get-output.js');
const fs = require('./utils/fs-extra.js');
const transformVueComponent = require('./transform-vue-component.js');

// Build Vue
async function buildVue(cb) {
  const buildPath = getOutput();

  const files = fs
    .readdirSync(path.resolve(__dirname, '../src/vue/components'))
    .filter((file) => file.indexOf('.vue') > 0);
  const componentImports = [];
  const componentExports = [];

  const componentsRegistrations = [];

  files.forEach((fileName) => {
    const componentName = fileName
      .replace('.vue', '')
      .split('-')
      .map((word) => word[0].toUpperCase() + word.substr(1))
      .join('');
    const fileBase = fileName.replace('.vue', '');
    componentImports.push(`import f7${componentName} from './components/${fileBase}.js';`);
    componentExports.push(`f7${componentName}`);
    componentsRegistrations.push(`app.component('f7-${fileBase}', f7${componentName})`);
    transformVueComponent(
      path.resolve(__dirname, `../src/vue/components/${fileName}`),
      path.resolve(__dirname, `../src/vue-temp/${fileName.replace('.vue', '.js')}`),
    );
  });

  const pluginContent = fs
    .readFileSync(path.resolve(__dirname, '../src/vue/framework7-vue.js'), 'utf-8')
    .replace('// IMPORT_COMPONENTS', componentImports.join('\n'))
    .replace('// EXPORT_COMPONENTS', `export { ${componentExports.join(', ')} }`);

  await exec.promise(
    `npx cross-env MODULES=esm npx babel --config-file ./babel-vue.config.js src/vue --out-dir ${buildPath}/vue --ignore "src/vue/framework7-vue.js","*.ts","*.jsx",*jsx --extensions .js`,
  );

  await exec.promise(
    `npx cross-env MODULES=esm npx babel --config-file ./babel-vue.config.js src/vue-temp --out-dir ${buildPath}/vue/components --ignore "src/vue/framework7-vue.js","*.ts","*.jsx",*jsx`,
  );
  fs.writeFileSync(`${buildPath}/vue/framework7-vue.js`, pluginContent);

  const esmContent = fs.readFileSync(`${buildPath}/vue/framework7-vue.js`, 'utf-8');

  fs.writeFileSync(`${buildPath}/vue/framework7-vue.js`, `${bannerVue.trim()}\n${esmContent}`);

  // Bundle
  const bundleContent = `
function registerComponents(app) {
  ${componentsRegistrations.join(';\n  ')}
}
export { registerComponents }
      `.trim();
  fs.writeFileSync(`${buildPath}/vue/framework7-vue-bundle.js`, `${esmContent}\n${bundleContent}`);

  if (cb) cb();
}

module.exports = buildVue;

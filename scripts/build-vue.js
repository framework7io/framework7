/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["off"] */

const exec = require('exec-sh');
const bannerReact = require('./banners/vue');
const getOutput = require('./get-output.js');
const fs = require('./utils/fs-extra');
const transformVueComponent = require('./transform-vue-component');

// Build Vue
async function buildVue(cb) {
  const env = process.env.NODE_ENV || 'development';
  const buildPath = getOutput();

  const files = fs.readdirSync('src/vue/components').filter((file) => file.indexOf('.vue') > 0);
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
    componentImports.push(`import f7${componentName} from './components/${fileBase}';`);
    componentExports.push(`f7${componentName}`);
    componentsRegistrations.push(`app.component('f7-${fileBase}', f7${componentName})`);
    const json = {
      name: `framework7-vue/${fileBase}`,
      private: true,
      sideEffects: false,
      main: `../../cjs/components/${fileBase}.js`,
      module: `../../esm/components/${fileBase}.js`,
      'jsnext:main': `../../esm/components/${fileBase}.js`,
      // typings: `${fileBase}.d.ts`,
    };
    fs.writeFileSync(
      `${buildPath}/vue/components/${fileBase}/package.json`,
      JSON.stringify(json, '', 2),
    );
    transformVueComponent(
      `src/vue/components/${fileName}`,
      `src/vue-temp/${fileName.replace('.vue', '.js')}`,
    );
  });

  const pluginContent = fs
    .readFileSync('src/vue/framework7-vue.js', 'utf-8')
    .replace('// IMPORT_COMPONENTS', componentImports.join('\n'))
    .replace('// EXPORT_COMPONENTS', `export { ${componentExports.join(', ')} }`);

  const buildCJS = async () => {
    fs.writeFileSync(`${buildPath}/vue/cjs/framework7-vue.js`, pluginContent);

    await exec.promise(
      `MODULES=cjs npx babel --config-file ./babel-vue.config.js src/vue --out-dir ${buildPath}/vue/cjs --ignore "src/vue/framework7-vue.js","*.ts","*.jsx",*jsx --extensions .js`,
    );
    await exec.promise(
      `MODULES=cjs npx babel --config-file ./babel-vue.config.js src/vue-temp --out-dir ${buildPath}/vue/cjs/components --ignore "src/vue/framework7-vue.js","*.ts","*.jsx",*jsx`,
    );
    await exec.promise(
      `MODULES=cjs npx babel --config-file ./babel-vue.config.js ${buildPath}/vue/cjs/framework7-vue.js --out-file ${buildPath}/vue/cjs/framework7-vue.js`,
    );

    const cjsContent = fs.readFileSync(`${buildPath}/vue/cjs/framework7-vue.js`, 'utf-8');

    fs.writeFileSync(
      `${buildPath}/vue/cjs/framework7-vue.js`,
      `${bannerReact.trim()}\n${cjsContent}`,
    );
    // Bundle
    const bundleContent = `
exports.registerComponents = function registerComponents (app) {
  ${componentsRegistrations.join(';\n  ')}
}
      `.trim();
    fs.writeFileSync(
      `${buildPath}/vue/cjs/framework7-vue-bundle.js`,
      `${bannerReact.trim()}\n${cjsContent}\n${bundleContent}`,
    );
  };

  const buildEMS = async () => {
    fs.writeFileSync(`${buildPath}/vue/esm/framework7-vue.js`, pluginContent);

    await exec.promise(
      `MODULES=esm npx babel --config-file ./babel-vue.config.js src/vue --out-dir ${buildPath}/vue/esm --ignore "src/vue/framework7-vue.js","*.ts","*.jsx",*jsx --extensions .js`,
    );

    await exec.promise(
      `MODULES=esm npx babel --config-file ./babel-vue.config.js src/vue-temp --out-dir ${buildPath}/vue/esm/components --ignore "src/vue/framework7-vue.js","*.ts","*.jsx",*jsx`,
    );

    const esmContent = fs.readFileSync(`${buildPath}/vue/esm/framework7-vue.js`, 'utf-8');

    fs.writeFileSync(
      `${buildPath}/vue/esm/framework7-vue.js`,
      `${bannerReact.trim()}\n${esmContent}`,
    );

    // Bundle
    const bundleContent = `
function registerComponents(app) {
  ${componentsRegistrations.join(';\n  ')}
}
export { registerComponents }
      `.trim();
    fs.writeFileSync(
      `${buildPath}/vue/esm/framework7-vue-bundle.js`,
      `${bannerReact.trim()}\n${esmContent}\n${bundleContent}`,
    );
  };

  if (env === 'production') {
    await buildCJS();
  }
  await buildEMS();

  if (cb) cb();
}

module.exports = buildVue;

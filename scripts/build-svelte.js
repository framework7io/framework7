/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["off"] */

const exec = require('exec-sh');
const svelte = require('svelte/compiler');
const bannerSvelte = require('./banners/svelte');
const getOutput = require('./get-output.js');
const fs = require('./utils/fs-extra');

const compileSvelteComponents = (buildPath, format) => {
  const svelteComponents = fs
    .readdirSync('src/svelte/components')
    .filter((fileName) => fileName.includes('.svelte'));

  svelteComponents.forEach((fileName) => {
    const fileContent = fs.readFileSync(`src/svelte/components/${fileName}`, 'utf-8');
    const fileResult = svelte.compile(fileContent, {
      format,
      filename: fileName,
    });
    fs.writeFileSync(
      `${buildPath}/svelte/${format}/components/${fileName.replace('.svelte', '.js')}`,
      fileResult.js.code,
    );
  });
};

// Build Svelte
async function buildSvelte(cb) {
  const env = process.env.NODE_ENV || 'development';
  const buildPath = getOutput();

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
    const json = {
      name: `framework7-svelte/${fileBase}`,
      private: true,
      sideEffects: false,
      main: `../../cjs/components/${fileBase}.js`,
      module: `../../esm/components/${fileBase}.js`,
      'jsnext:main': `../../esm/components/${fileBase}.js`,
    };
    fs.writeFileSync(
      `${buildPath}/svelte/components/${fileBase}/package.json`,
      JSON.stringify(json, '', 2),
    );
  });

  const pluginContent = fs
    .readFileSync('src/svelte/framework7-svelte.js', 'utf-8')
    .replace('// IMPORT_COMPONENTS', componentImports.join('\n'))
    .replace('// EXPORT_COMPONENTS', `export { ${componentExports.join(', ')} }`);

  const buildCJS = async () => {
    fs.writeFileSync(`${buildPath}/svelte/cjs/framework7-svelte.js`, pluginContent);

    await exec.promise(
      `MODULES=cjs npx babel --config-file ./babel-svelte.config.js src/svelte --out-dir ${buildPath}/svelte/cjs --ignore "src/svelte/framework7-svelte.js","*.svelte"`,
    );
    await exec.promise(
      `MODULES=cjs npx babel --config-file ./babel-svelte.config.js ${buildPath}/svelte/cjs/framework7-svelte.js --out-file ${buildPath}/svelte/cjs/framework7-svelte.js`,
    );

    const cjsContent = fs.readFileSync(`${buildPath}/svelte/cjs/framework7-svelte.js`, 'utf-8');

    fs.writeFileSync(
      `${buildPath}/svelte/cjs/framework7-svelte.js`,
      `${bannerSvelte.trim()}\n${cjsContent}`,
    );

    compileSvelteComponents(buildPath, 'cjs');
  };

  const buildEMS = async () => {
    fs.writeFileSync(`${buildPath}/svelte/esm/framework7-svelte.js`, pluginContent);

    await exec.promise(
      `MODULES=esm npx babel --config-file ./babel-svelte.config.js src/svelte --out-dir ${buildPath}/svelte/esm --ignore "src/svelte/framework7-svelte.js","*.svelte"`,
    );

    const esmContent = fs.readFileSync(`${buildPath}/svelte/esm/framework7-svelte.js`, 'utf-8');

    fs.writeFileSync(
      `${buildPath}/svelte/esm/framework7-svelte.js`,
      `${bannerSvelte.trim()}\n${esmContent}`,
    );

    compileSvelteComponents(buildPath, 'esm');
  };

  if (env === 'production') {
    await buildCJS();
  }
  await buildEMS();

  if (cb) cb();
}

module.exports = buildSvelte;

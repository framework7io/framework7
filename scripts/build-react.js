/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const exec = require('exec-sh');
const bannerReact = require('./banners/react');
const getOutput = require('./get-output.js');
const fs = require('./utils/fs-extra');

// Build React
async function buildReact(cb) {
  const env = process.env.NODE_ENV || 'development';
  const buildPath = getOutput();

  const files = fs.readdirSync('src/react/components').filter((file) => file.indexOf('.d.ts') < 0);
  const componentImports = [];
  const componentExports = [];

  files.forEach((fileName) => {
    const componentName = fileName
      .replace('.jsx', '')
      .split('-')
      .map((word) => word[0].toUpperCase() + word.substr(1))
      .join('');
    const fileBase = fileName.replace('.jsx', '');
    componentImports.push(`import ${componentName} from './components/${fileBase}';`);
    componentExports.push(componentName);
    const json = {
      name: `framework7-react/${fileBase}`,
      private: true,
      main: `../../cjs/components/${fileBase}.js`,
      module: `../../esm/components/${fileBase}.js`,
      'jsnext:main': `../../esm/components/${fileBase}.js`,
      typings: `${fileBase}.d.ts`,
    };
    fs.writeFileSync(
      `${buildPath}/react/components/${fileBase}/package.json`,
      JSON.stringify(json, '', 2),
    );
  });

  const pluginContent = fs
    .readFileSync('src/react/framework7-react.js', 'utf-8')
    .replace('// IMPORT_COMPONENTS', componentImports.join('\n'))
    .replace('// EXPORT_COMPONENTS', `export { ${componentExports.join(', ')} }`);

  const buildCJS = async () => {
    fs.writeFileSync(`${buildPath}/react/cjs/framework7-react.js`, pluginContent);

    await exec.promise(
      `MODULES=cjs npx babel --config-file ./babel-react.config.js src/react --out-dir ${buildPath}/react/cjs --ignore "src/react/framework7-react.js","*.ts"`,
    );
    await exec.promise(
      `MODULES=cjs npx babel --config-file ./babel-react.config.js ${buildPath}/react/cjs/framework7-react.js --out-file ${buildPath}/react/cjs/framework7-react.js`,
    );

    const cjsContent = fs.readFileSync(`${buildPath}/react/cjs/framework7-react.js`, 'utf-8');

    fs.writeFileSync(
      `${buildPath}/react/cjs/framework7-react.js`,
      `${bannerReact.trim()}\n${cjsContent}`,
    );
  };

  const buildEMS = async () => {
    fs.writeFileSync(`${buildPath}/react/esm/framework7-react.js`, pluginContent);

    await exec.promise(
      `MODULES=esm npx babel --config-file ./babel-react.config.js src/react --out-dir ${buildPath}/react/esm --ignore "src/react/framework7-react.js","*.ts"`,
    );

    const esmContent = fs.readFileSync(`${buildPath}/react/esm/framework7-react.js`, 'utf-8');

    fs.writeFileSync(
      `${buildPath}/react/esm/framework7-react.js`,
      `${bannerReact.trim()}\n${esmContent}`,
    );
  };

  if (env === 'production') {
    await buildCJS();
  }
  await buildEMS();

  if (cb) cb();
}

module.exports = buildReact;

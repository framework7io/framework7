/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["off"] */

const path = require('path');
const exec = require('exec-sh');
const glob = require('glob');
const bannerReact = require('./banners/react.js');
const getOutput = require('./get-output.js');
const fs = require('./utils/fs-extra.js');

const removeDtsComments = (buildPath) => {
  glob(
    '*.js',
    { cwd: path.resolve(__dirname, `${buildPath}/react/components`) },
    (err, componentFiles) => {
      componentFiles.forEach((file) => {
        let fileContent = fs.readFileSync(
          path.resolve(__dirname, `${buildPath}/react/components`, file),
        );
        if (fileContent.indexOf('/* dts-imports') >= 0) {
          const imports = fileContent.split('/* dts-imports')[1].split('*/')[0] || '';
          fileContent = fileContent.replace(imports, '');
        }
        if (fileContent.indexOf('/* dts-props') >= 0) {
          const props = fileContent.split('/* dts-props')[1].split('*/')[0] || '';
          fileContent = fileContent.replace(props, '');
        }
        if (fileContent.indexOf('/* dts-extends') >= 0) {
          const propsExtends = fileContent.split('/* dts-extends')[1].split('*/')[0] || '';
          fileContent = fileContent.replace(propsExtends, '');
        }
        fileContent = fileContent
          .replace('/* dts-imports*/\n', '')
          .replace('/* dts-props*/\n', '')
          .replace('/* dts-extends*/\n', '');
        fs.writeFileSync(path.resolve(`${buildPath}/react/components`, file), fileContent);
      });
    },
  );
};

// Build React
async function buildReact(cb) {
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
    componentImports.push(`import ${componentName} from './components/${fileBase}.js';`);
    componentExports.push(componentName);
  });

  const pluginContent = fs
    .readFileSync('src/react/framework7-react.js', 'utf-8')
    .replace('// IMPORT_COMPONENTS', componentImports.join('\n'))
    .replace('// EXPORT_COMPONENTS', `export { ${componentExports.join(', ')} }`);

  await exec.promise(
    `npx cross-env MODULES=esm npx babel --config-file ./babel-react.config.js src/react --out-dir ${buildPath}/react --ignore "src/react/framework7-react.js","*.ts"`,
  );

  fs.writeFileSync(`${buildPath}/react/framework7-react.js`, pluginContent);

  const esmContent = fs.readFileSync(`${buildPath}/react/framework7-react.js`, 'utf-8');

  fs.writeFileSync(
    `${buildPath}/react/framework7-react.js`,
    `${bannerReact.trim()}\n${esmContent}`,
  );

  // remove dts-comments
  removeDtsComments(buildPath);

  if (cb) cb();
}

module.exports = buildReact;

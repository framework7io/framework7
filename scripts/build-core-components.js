/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */
const fsNative = require('fs');
const path = require('path');
const glob = require('glob');
const getOutput = require('./get-output.js');
const fs = require('./utils/fs-extra');

function base64Encode(file) {
  // read binary data
  const bitmap = fsNative.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString('base64');
}

function build(cb) {
  const output = `${getOutput()}/core`;
  // components package.json
  const componentsFolders = fs.readdirSync('./src/core/components').filter((folder) => {
    return fsNative.lstatSync(`./src/core/components/${folder}`).isDirectory();
  });
  componentsFolders.forEach((component) => {
    const json = JSON.stringify(
      {
        name: `framework7/${component}`,
        private: true,
        sideEffects: false,
        main: `../../cjs/components/${component}/${component}.js`,
        module: `../../esm/components/${component}/${component}.js`,
        'jsnext:main': `../../esm/components/${component}/${component}.js`,
        typings: `../../types/components/${component}/${component}.d.ts`,
      },
      '',
      2,
    );
    fs.writeFileSync(`${output}/components/${component}/package.json`, json);
  });

  // modules package.json
  const modulesFolders = fs.readdirSync('./src/core/modules').filter((folder) => {
    return fsNative.lstatSync(`./src/core/modules/${folder}`).isDirectory();
  });
  modulesFolders.forEach((moduleName) => {
    const json = JSON.stringify(
      {
        name: `framework7/${moduleName}`,
        private: true,
        sideEffects: false,
        main: `../../cjs/modules/${moduleName}/${moduleName}.js`,
        module: `../../esm/modules/${moduleName}/${moduleName}.js`,
        'jsnext:main': `../../esm/modules/${moduleName}/${moduleName}.js`,
        typings: `../../types/modules/${moduleName}/${moduleName}.d.ts`,
      },
      '',
      2,
    );
    fs.writeFileSync(`${output}/modules/${moduleName}/package.json`, json);
  });

  // process modules
  glob('**/*.*', { cwd: path.resolve(__dirname, '../src/core/modules') }, (err, files) => {
    const filesToProcess = files.filter((file) => {
      return file.indexOf('.d.ts') >= 0;
    });
    filesToProcess.forEach((file) => {
      const fileContent = fs.readFileSync(path.resolve(__dirname, '../src/core/modules', file));
      fs.writeFileSync(path.resolve(`${output}/modules`, file), fileContent);
    });
  });

  // process components
  glob('**/*.*', { cwd: path.resolve(__dirname, '../src/core/components') }, (err, files) => {
    const filesToProcess = files.filter((file) => {
      if (file.indexOf('icons/') === 0) return false;
      if (file === 'framework7.less') return false;
      if (file === 'framework7.d.ts') return false;
      if (file.indexOf('.js') >= 0) return false;
      return true;
    });
    filesToProcess.forEach((file, index) => {
      let fileContent = fs.readFileSync(path.resolve(__dirname, '../src/core/components', file));
      if (file.indexOf('app.less') >= 0) {
        const iconsFontBase64 = base64Encode('./src/core/icons/font/framework7-core-icons.woff');
        fileContent = fileContent.replace('framework7_coreIconsFont()', `'${iconsFontBase64}'`);
      }
      if (file.indexOf('swiper.less') >= 0) {
        fileContent = fileContent.replace(
          '../../../../node_modules/swiper/swiper-bundle.css',
          '~swiper/swiper-bundle.css',
        );
      }
      if (file.indexOf('skeleton.less') >= 0) {
        fileContent = fileContent.replace(
          '../../../../node_modules/skeleton-elements/skeleton-elements.css',
          '~skeleton-elements/skeleton-elements.css',
        );
      }
      fs.writeFileSync(path.resolve(`${output}/components`, file), fileContent);
      if (index === filesToProcess.length - 1) {
        cb();
      }
    });
  });
}

module.exports = build;

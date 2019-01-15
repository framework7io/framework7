/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */
const fsNative = require('fs');
const path = require('path');
const glob = require('glob');
const getConfig = require('./get-core-config.js');
const getOutput = require('./get-output.js');
const fs = require('./utils/fs-extra');

function base64Encode(file) {
  // read binary data
  const bitmap = fsNative.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString('base64');
}

function build(cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || config.target || 'universal';
  const format = 'es';
  const output = `${getOutput()}/core`;
  glob('**/*.*', { cwd: path.resolve(__dirname, '../src/core') }, (err, files) => {
    files.forEach((file, index) => {
      if (file.indexOf('icons/') === 0) return;
      if (file === 'framework7.less') return;
      if (file === 'framework7.js') return;
      if (file === 'framework7.d.ts') return;
      let fileContent = fs.readFileSync(path.resolve(__dirname, '../src/core', file));
      if (file.indexOf('.js') >= 0) {
        fileContent = fileContent
          .replace('process.env.NODE_ENV', JSON.stringify(env))
          .replace('process.env.TARGET', JSON.stringify(target))
          .replace('process.env.FORMAT', JSON.stringify(format));
      }
      if (file.indexOf('app.less') >= 0) {
        const iconsFontBase64 = base64Encode('./src/core/icons/font/framework7-core-icons.woff');
        const skeletonFontBase64 = base64Encode('./src/core/icons/font/framework7-skeleton.woff');
        fileContent = fileContent
          .replace('framework7_coreIconsFont()', `'${iconsFontBase64}'`)
          .replace('framework7_skeletonFont()', `'${skeletonFontBase64}'`);
      }
      fs.writeFileSync(path.resolve(output, file), fileContent);
      if (index === files.length - 1) cb();
    });
  });
}

module.exports = build;

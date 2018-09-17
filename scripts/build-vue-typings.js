/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: "off" */

const gulp = require('gulp');
const modifyFile = require('gulp-modify-file');
const rename = require('gulp-rename');
const fs = require('fs');

const importLib = `
import Vue from 'vue';
`.trim();

const libExtension = `
declare module 'vue/types/vue' {
  interface Vue extends Framework7Extensions {}
}
`.trim();

const declarePlugin = `
declare const Framework7Vue: Framework7Plugin;
`.trim();

const exportPlugin = `
export default Framework7Vue;
`.trim();

function buildTypings(cb) {
  const env = process.env.NODE_ENV || 'development';
  const output = `${env === 'development' ? './build' : './packages'}/vue`;

  const files = fs.readdirSync(`${output}/components`).filter(file => file.indexOf('.d.ts') < 0);

  const components = [];
  const componentImports = [];
  const componentExports = [];

  files.forEach((fileName) => {
    const componentName = fileName
      .replace('.js', '')
      .split('-')
      .map(word => word[0].toUpperCase() + word.substr(1))
      .join('');
    components.push({
      name: `${componentName}`,
      importName: `F7${componentName}`,
    });
    componentImports.push(`import f7${componentName} from './components/${fileName.replace('.js', '')}';`);
    componentExports.push(`  f7${componentName}`);
  });

  gulp.src('./src/phenome/framework7-phenome.d.ts')
    .pipe(modifyFile((content) => {
      // Modify content
      content = content
        .replace('// IMPORT_LIB', importLib)
        .replace('// IMPORT_COMPONENTS', componentImports.join('\n'))
        .replace('// LIB_EXTENSION', libExtension)
        .replace('// EXPORT_COMPONENTS', `export {\n${componentExports.join(',\n')}\n}`)
        .replace('// DECLARE_PLUGIN', declarePlugin)
        .replace('// EXPORT_PLUGIN', exportPlugin);
      return content;
    }))
    .pipe(rename((file) => { file.basename = 'framework7-vue.d'; file.extname = '.ts'; }))
    .pipe(gulp.dest(`${output}/`))
    .pipe(rename((file) => { file.basename = 'framework7-vue.esm.d'; }))
    .pipe(gulp.dest(`${output}/`))
    .pipe(rename((file) => { file.basename = 'framework7-vue.esm.bundle.d'; }))
    .pipe(gulp.dest(`${output}/`))
    .on('end', cb);
}

module.exports = buildTypings;

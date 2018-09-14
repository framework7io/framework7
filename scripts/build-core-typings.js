/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const gulp = require('gulp');
const fs = require('fs');
const modifyFile = require('gulp-modify-file');
const rename = require('gulp-rename');
const getOutput = require('./get-core-output.js');

function capitalize(name) {
  return name.split('-').map((word) => { // eslint-disable-line
    return word.split('').map((char, index) => {
      if (index === 0) return char.toUpperCase();
      return char;
    }).join('');
  }).join('');
}

function buildTypings(cb) {
  const output = getOutput();

  const modules = fs.readdirSync('./src/core/modules').filter((file) => {
    if (file[0] === '.') return false;
    return fs.existsSync(`./src/core/modules/${file}/${file}.d.ts`);
  });
  const components = fs.readdirSync('./src/core/components').filter((file) => {
    if (file[0] === '.') return false;
    return fs.existsSync(`./src/core/components/${file}/${file}.d.ts`);
  });


  gulp.src('./src/core/framework7.d.ts')
    .pipe(modifyFile((content) => {
      const importModules = modules.map((f7Module) => {
        const capitalized = capitalize(f7Module);
        return `import {${capitalized} as ${capitalized}Namespace} from './modules/${f7Module}/${f7Module}';`;
      });

      const importComponents = components.map((component) => {
        const capitalized = capitalize(component);
        return `import {${capitalized} as ${capitalized}Namespace} from './components/${component}/${component}';`;
      });

      const install = [...modules, ...components].map((f7Module) => {
        const capitalized = capitalize(f7Module);
        return [
          `interface Framework7Class<Events> extends ${capitalized}Namespace.AppMethods{}`,
          `interface Framework7Params extends ${capitalized}Namespace.AppParams{}`,
          `interface Framework7Events extends ${capitalized}Namespace.AppEvents{}`,
        ].join('\n  ');
      });

      // eslint-disable-next-line
      content = content
        .replace(/\/\/ IMPORT_MODULES/, importModules.join('\n'))
        .replace(/\/\/ IMPORT_COMPONENTS/, importComponents.join('\n'))
        .replace(/\/\/ INSTALL/, install.join('\n  '));

      return content;
    }))
    .pipe(gulp.dest(`${output}/`))
    .pipe(rename((file) => { file.basename = 'framework7.esm.bundle.d'; }))
    .pipe(gulp.dest(`${output}/`))
    .on('end', cb);
}

module.exports = buildTypings;

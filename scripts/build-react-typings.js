/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: "off" */

const gulp = require('gulp');
const modifyFile = require('gulp-modify-file');
const rename = require('gulp-rename');

const typesImports = `
import React from 'react';
import { Dom7 } from 'dom7';
import Framework7 from 'framework7';
import { Framework7Plugin } from 'framework7/components/app/app-class';
import { Router } from 'framework7/modules/router/router';
import { Device } from 'framework7/utils/device';
import { Request } from 'framework7/utils/request';
import { Utils } from 'framework7/utils/utils';
`.trim();

const typesExtension = `
interface Framework7Extensions {
  /** Main Framework7's initialized instance. It allows you to use any of Framework7 APIs */
  $f7: Framework7
  /** Callback function that will be executed when Framework7 fully intialized. Useful to use in components when you need to access Framework7 API and to be sure it is ready. So it is safe to put all Framework7 related logic into this callback. As an argument it receives initialized Framework7 instance */
  $f7ready(onF7Ready: (f7: Framework7) => void): void
  /** Access to built-in Dom7 DOM library that utilizes most edge and high-performance methods for DOM manipulation */
  $$: Dom7
  /** Access to built-in Dom7 DOM library that utilizes most edge and high-performance methods for DOM manipulation */
  $Dom7: Dom7
  /** Framework7 Router Instance. It has a lot of useful Methods & Properties to use for navigation */
  $f7router: Router.Router
  /** Object with current route data that was used to load this page, tab or modal */
  $f7route: Router.Route
  /** Access to Device utilities */
  $device: Device
  /** Access to Request library for XHR requests */
  $request: Request
  /** Access to Utils object with few useful utilities */
  $utils: Utils
  /** Object with boolean properties with information about currently used theme (iOS or MD) */
  $theme: {
    ios: boolean
    md: boolean
  }
}

declare module 'react' {
  interface Component extends Framework7Extensions {}
}
`.trim();

function buildTypings(cb) {
  const env = process.env.NODE_ENV || 'development';
  const output = `${env === 'development' ? './build' : './packages'}/react`;
  gulp.src(`${output}/framework7-react.esm.js`)
    .pipe(modifyFile((content) => {
      const firstImport = content.indexOf('import');
      const firstExport = content.indexOf('export');
      // Modify content
      content = `
${content.substr(0, firstImport)}
${typesImports}

${content.substring(firstImport, firstExport)}

${typesExtension}

${content.substring(firstExport)}
`.trim();
      // Replace Plugin Import/Export
      content = content
        .replace('import Framework7React from \'./utils/plugin\';', '')
        .replace('export default Framework7React;', [
          'declare const Framework7React: Framework7Plugin;',
          'export default Framework7React;',
        ].join('\n'));
      return `${content}\n`;
    }))
    .pipe(rename((file) => { file.basename = 'framework7-react.d'; file.extname = '.ts'; }))
    .pipe(gulp.dest(`${output}/`))
    .pipe(rename((file) => { file.basename = 'framework7-react.esm.d'; }))
    .pipe(gulp.dest(`${output}/`))
    .on('end', cb);
}

module.exports = buildTypings;

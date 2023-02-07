/* eslint no-console: ["error", { allow: ["log"] }] */
const gulp = require('gulp');
const connect = require('gulp-connect');
const opn = require('opn');

const buildClean = require('./build-clean.js');

const buildKsCore = require('./build-ks-core.js');

const buildMaterialColorUtils = require('./build-material-color-utils.js');
const buildCoreJs = require('./build-core-js.js');
const buildCoreTypings = require('./build-core-typings.js');
const buildCoreLess = require('./build-core-styles.js');
const buildCoreComponents = require('./build-core-components.js');

const buildVue = require('./build-vue.js');
const buildVueTypings = require('./build-vue-typings.js');
const buildReact = require('./build-react.js');
const buildReactTypings = require('./build-react-typings.js');
const buildSvelte = require('./build-svelte.js');
const buildSvelteTypings = require('./build-svelte-typings.js');

const env = process.env.NODE_ENV || 'development';

// Tasks
gulp.task('ks-core', buildKsCore);

gulp.task('core-clean', (cb) => buildClean('core', cb));
gulp.task('core-material-color-utils', buildMaterialColorUtils);
gulp.task('core-js', buildCoreJs);
gulp.task('core-typings', buildCoreTypings);
gulp.task('core-styles', buildCoreLess);
gulp.task('core-components', buildCoreComponents);

gulp.task('react-clean', (cb) => buildClean('react', cb));
gulp.task('react', buildReact);
gulp.task('react-typings', buildReactTypings);

gulp.task('vue-clean', (cb) => buildClean('vue', cb));
gulp.task('vue', buildVue);
gulp.task('vue-typings', buildVueTypings);

gulp.task('svelte-clean', (cb) => buildClean('svelte', cb));
gulp.task('svelte', buildSvelte);
gulp.task('svelte-typings', buildSvelteTypings);

// eslint-disable-next-line
gulp.task(
  'build-core',
  gulp.series([
    'core-clean',
    'core-material-color-utils',
    'core-components',
    'core-js',
    'core-typings',
    'core-styles',
  ]),
);
gulp.task('build-react', gulp.series(['react-clean', 'react', 'react-typings']));
gulp.task('build-vue', gulp.series(['vue-clean', 'vue', 'vue-typings']));
gulp.task('build-svelte', gulp.series(['svelte-clean', 'svelte', 'svelte-typings']));

// Watchers
const watch = {
  all() {
    gulp.watch(['./src/core/**/*.js'], gulp.series('core-js', 'core-components'));
    gulp.watch(['./src/core/**/*.d.ts'], gulp.series('core-typings'));
    gulp.watch('./src/core/**/*.less', gulp.series('core-styles', 'core-components'));
  },
  core() {
    gulp.watch(['./src/core/**/*.js'], gulp.series(['core-js', 'core-components']));
    gulp.watch(['./src/core/**/*.d.ts'], gulp.series('core-typings'));
    gulp.watch('./src/**/**/*.less', gulp.series(['core-styles', 'core-components']));
  },
  react() {
    gulp.watch(['./src/core/**/*.js'], gulp.series('core-js', 'core-components'));
    gulp.watch('./src/core/**/*.less', gulp.series('core-styles', 'core-components'));
    gulp.watch(['./src/react/**/*.js', './src/react/**/*.jsx'], gulp.series('build-react'));
  },
  vue() {
    gulp.watch(['./src/core/**/*.js'], gulp.series('core-js', 'core-components'));
    gulp.watch('./src/core/**/*.less', gulp.series('core-styles', 'core-components'));
    gulp.watch(['./src/vue/**/*.js', './src/vue/**/*.vue'], gulp.series('build-vue'));
  },
  svelte() {
    gulp.watch(['./src/core/**/*.js'], gulp.series('core-js', 'core-components'));
    gulp.watch('./src/core/**/*.less', gulp.series('core-styles', 'core-components'));
    gulp.watch(['./src/svelte/**/*.js', './src/svelte/**/*.svelte'], gulp.series('build-svelte'));
  },
};

// Server
function server() {
  connect.server({
    host: '0.0.0.0',
    root: ['./'],
    livereload: false,
    port: '3000',
  });
}
gulp.task('server', () => {
  if (env === 'development') watch.all();
  server();
  opn('http://localhost:3000/kitchen-sink/core/');
});
gulp.task('server-core', () => {
  if (env === 'development') watch.core();
  server();
  opn('http://localhost:3000/kitchen-sink/core/');
});

gulp.task('watch', () => {
  watch.all();
});
gulp.task('watch-core', () => {
  watch.core();
});
gulp.task('watch-react', () => {
  watch.react();
});
gulp.task('watch-vue', () => {
  watch.vue();
});
gulp.task('watch-svelte', () => {
  watch.svelte();
});

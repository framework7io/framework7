/* eslint no-console: ["error", { allow: ["log"] }] */
const gulp = require('gulp');
const connect = require('gulp-connect');
const gopen = require('gulp-open');

const buildKsCore = require('./build-ks-core.js');
const buildKsVue = require('./build-ks-vue.js');
const buildKsReact = require('./build-ks-react.js');

const buildCoreJs = require('./build-core-js.js');
const buildCoreTypings = require('./build-core-typings.js');
const buildCoreLess = require('./build-core-less.js');
const buildCoreComponents = require('./build-core-components.js');
const buildCoreLazy = require('./build-core-lazy.js');

const buildPhenome = require('./build-phenome.js');
const buildVue = require('./build-vue');
const buildVueTypings = require('./build-vue-typings.js');
const buildReact = require('./build-react');
const buildReactTypings = require('./build-react-typings.js');

const env = process.env.NODE_ENV || 'development';

// Tasks
gulp.task('ks-core', buildKsCore);
gulp.task('ks-vue', buildKsVue);
gulp.task('ks-react', buildKsReact);
gulp.task('core-js', buildCoreJs);
gulp.task('core-typings', buildCoreTypings);
gulp.task('core-less', buildCoreLess);
gulp.task('core-components', buildCoreComponents);
gulp.task('core-lazy', buildCoreLazy);
gulp.task('phenome', buildPhenome);

gulp.task('react', buildReact);
gulp.task('react-typings', buildReactTypings);

gulp.task('vue', buildVue);
gulp.task('vue-typings', buildVueTypings);

gulp.task('build-core', gulp.series('core-js', 'core-components', 'core-typings', 'core-less', 'core-lazy'));
gulp.task('build-react', gulp.series('react', 'react-typings'));
gulp.task('build-vue', gulp.series('vue', 'vue-typings'));

// Watchers
const watch = {
  all() {
    gulp.watch(['./src/core/**/*.js'], gulp.series(
      'core-js',
      'core-components',
      'ks-react',
      'ks-vue'
    ));
    gulp.watch(['./src/core/**/*.d.ts'], gulp.series(
      'core-typings'
    ));
    gulp.watch('./src/core/**/*.less', gulp.series(
      'core-less',
      'core-components'
    ));
    gulp.watch(['./src/phenome/**/*.js', './src/phenome/**/*.jsx'], gulp.series(
      'phenome',
      'build-react',
      'build-vue',
      'ks-react',
      'ks-vue'
    ));
    gulp.watch(['./kitchen-sink/react/src/**/*.js', './kitchen-sink/react/src/**/*.jsx'], gulp.series(
      'ks-react'
    ));
    gulp.watch(['./kitchen-sink/vue/src/**/*.js', './kitchen-sink/vue/src/**/*.vue'], gulp.series(
      'ks-vue'
    ));
  },
  core() {
    gulp.watch(['./src/core/**/*.js'], gulp.series(
      'core-js',
      'core-components',
      'core-lazy',
    ));
    gulp.watch(['./src/core/**/*.d.ts'], gulp.series(
      'core-typings'
    ));
    gulp.watch('./src/**/**/*.less', gulp.series(
      'core-less',
      'core-components',
      'core-lazy',
    ));
  },
  react() {
    gulp.watch(['./src/core/**/*.js'], gulp.series(
      'core-js',
      'core-components',
      'ks-react'
    ));
    gulp.watch('./src/core/**/*.less', gulp.series(
      'core-less',
      'core-components',
    ));
    gulp.watch(['./src/phenome/**/*.js', './src/phenome/**/*.jsx'], gulp.series(
      'phenome',
      'build-react',
      'ks-react'
    ));
    gulp.watch(['./kitchen-sink/react/src/**/*.js', './kitchen-sink/react/src/**/*.jsx'], gulp.series([
      'ks-react',
    ]));
  },
  vue() {
    gulp.watch(['./src/core/**/*.js'], gulp.series(
      'core-js',
      'core-components',
      'ks-vue'
    ));
    gulp.watch('./src/core/**/*.less', gulp.series(
      'core-less',
      'core-components',
    ));
    gulp.watch(['./src/phenome/**/*.js', './src/phenome/**/*.jsx'], gulp.series(
      'phenome',
      'build-vue',
      'ks-vue'
    ));
    gulp.watch(['./kitchen-sink/vue/src/**/*.js', './kitchen-sink/vue/src/**/*.vue'], gulp.series([
      'ks-vue',
    ]));
  },
};

// Server
function server() {
  connect.server({
    root: ['./'],
    livereload: false,
    port: '3000',
  });
}
gulp.task('server', () => {
  if (env === 'development') watch.all();
  server();
  return gulp.src('./kitchen-sink/core/index.html').pipe(gopen({ uri: 'http://localhost:3000/kitchen-sink/core/' }));
});
gulp.task('server-core', () => {
  if (env === 'development') watch.core();
  server();
  return gulp.src('./kitchen-sink/core/index.html').pipe(gopen({ uri: 'http://localhost:3000/kitchen-sink/core/' }));
});
gulp.task('server-react', () => {
  if (env === 'development') watch.react();
  server();
  return gulp.src('./kitchen-sink/react/index.html').pipe(gopen({ uri: 'http://localhost:3000/kitchen-sink/react/' }));
});
gulp.task('server-vue', () => {
  if (env === 'development') watch.vue();
  server();
  return gulp.src('./kitchen-sink/vue/index.html').pipe(gopen({ uri: 'http://localhost:3000/kitchen-sink/vue/' }));
});

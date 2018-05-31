/* eslint no-console: ["error", { allow: ["log"] }] */
const gulp = require('gulp');
const connect = require('gulp-connect');
const gopen = require('gulp-open');

const buildKsCore = require('./build-ks-core.js');
const buildKsVue = require('./build-ks-vue.js');
const buildKsReact = require('./build-ks-react.js');

const buildCoreJs = require('./build-core-js.js');
const buildCoreLess = require('./build-core-less.js');
const buildCoreComponents = require('./build-core-components.js');

const buildPhenome = require('./build-phenome.js');

const env = process.env.NODE_ENV || 'development';

// Tasks
gulp.task('ks-core', (cb) => {
  buildKsCore(cb);
});
gulp.task('ks-vue', (cb) => {
  buildKsVue(cb);
});
gulp.task('ks-react', (cb) => {
  buildKsReact(cb);
});
gulp.task('core-js', (cb) => {
  buildCoreJs(cb);
});
gulp.task('core-less', (cb) => {
  buildCoreLess(cb);
});
gulp.task('core-components', (cb) => {
  buildCoreComponents(cb);
});
gulp.task('phenome', (cb) => {
  buildPhenome(cb);
});

// Build Core
gulp.task('build-core', ['core-js', 'core-less', 'core-components']);

// Watchers
const watch = {
  all() {
    gulp.watch(['./src/**/**/*.js', '!./src/phenome/**/*.js'], ['core-js', 'ks-react', 'ks-vue']);
    gulp.watch('./src/**/**/*.less', ['core-less']);
    gulp.watch(['./src/phenome/**/*.js', './src/phenome/**/*.jsx'], ['phenome', 'ks-react', 'ks-vue']);
    gulp.watch(['./react/kitchen-sink/src/**/*.js', './react/kitchen-sink/src/**/*.jsx'], ['ks-react']);
    gulp.watch(['./vue/kitchen-sink/src/**/*.js', './vue/kitchen-sink/src/**/*.jsx'], ['ks-vue']);
  },
  core() {
    gulp.watch(['./src/**/**/*.js', '!./src/phenome/**/*.js'], ['core-js']);
    gulp.watch('./src/**/**/*.less', ['core-less']);
  },
  react() {
    gulp.watch(['./src/**/**/*.js', '!./src/phenome/**/*.js'], ['core-js', 'ks-react']);
    gulp.watch('./src/**/**/*.less', ['core-less']);
    gulp.watch(['./src/phenome/**/*.js', './src/phenome/**/*.jsx'], ['phenome', 'ks-react']);
    gulp.watch(['./react/kitchen-sink/src/**/*.js', './react/kitchen-sink/src/**/*.jsx'], ['ks-react']);
  },
  vue() {
    gulp.watch(['./src/**/**/*.js', '!./src/phenome/**/*.js'], ['core-js', 'ks-vue']);
    gulp.watch('./src/**/**/*.less', ['core-less']);
    gulp.watch(['./src/phenome/**/*.js', './src/phenome/**/*.jsx'], ['phenome', 'ks-vue']);
    gulp.watch(['./vue/kitchen-sink/src/**/*.js', './vue/kitchen-sink/src/**/*.jsx'], ['ks-vue']);
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
  gulp.src('./kitchen-sink/core/index.html').pipe(gopen({ uri: 'http://localhost:3000/kitchen-sink/core/' }));
});
gulp.task('server-core', () => {
  if (env === 'development') watch.core();
  server();
  gulp.src('./kitchen-sink/core/index.html').pipe(gopen({ uri: 'http://localhost:3000/kitchen-sink/core/' }));
});
gulp.task('server-react', () => {
  if (env === 'development') watch.react();
  server();
  gulp.src('./kitchen-sink/react/index.html').pipe(gopen({ uri: 'http://localhost:3000/kitchen-sink/react/' }));
});
gulp.task('server-vue', () => {
  if (env === 'development') watch.vue();
  server();
  gulp.src('./kitchen-sink/vue/index.html').pipe(gopen({ uri: 'http://localhost:3000/kitchen-sink/vue/' }));
});


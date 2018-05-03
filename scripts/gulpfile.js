/* eslint no-console: ["error", { allow: ["log"] }] */
const gulp = require('gulp');
const connect = require('gulp-connect');
const gopen = require('gulp-open');

const buildKsCore = require('./build-ks-core.js');
const buildKsVue = require('./build-ks-vue.js');
const buildJs = require('./build-js.js');
const buildLess = require('./build-less.js');
const buildComponents = require('./build-components.js');
const buildPhenome = require('./build-phenome.js');

// Tasks
gulp.task('ks-core', (cb) => {
  buildKsCore(cb);
});
gulp.task('ks-vue', (cb) => {
  buildKsVue(cb);
});
gulp.task('js', (cb) => {
  buildJs(cb);
});

gulp.task('less', (cb) => {
  buildLess(cb);
});

gulp.task('components', (cb) => {
  buildComponents(cb);
});
gulp.task('phenome', (cb) => {
  buildPhenome(cb);
});

gulp.task('build', ['js', 'less', 'components']);

gulp.task('watch', () => {
  gulp.watch('./src/**/**/*.js', ['js']);
  gulp.watch('./src/**/**/*.less', ['less']);

  gulp.watch(['./src/phenome/**/*.js', './src/phenome/**/*.jsx'], ['phenome', 'ks-vue']);
  gulp.watch(['./vue/kitchen-sink/src/**/*.js', './vue/kitchen-sink/src/**/*.vue'], ['ks-vue']);
});

gulp.task('connect', () => {
  connect.server({
    root: ['./'],
    livereload: false,
    port: '3000',
  });
});

gulp.task('open', () => {
  gulp.src('./kitchen-sink/index.html').pipe(gopen({ uri: 'http://localhost:3000/kitchen-sink/' }));
});

gulp.task('server', ['watch', 'connect', 'open']);

gulp.task('default', ['server']);

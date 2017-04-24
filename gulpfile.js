const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const header = require('gulp-header');
const uglify = require('gulp-uglify');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('rollup-stream');
const buble = require('rollup-plugin-buble');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const less = require('gulp-less');
const rename = require('gulp-rename');
const resolve = require('rollup-plugin-node-resolve');
const pkg = require('./package.json');

const banner = [
  '/**',
  ' * Framework7 <%= pkg.version %>',
  ' * <%= pkg.description %>',
  ' * <%= pkg.homepage %>',
  ' * ',
  ' * Copyright <%= date.year %>, <%= pkg.author %>',
  ' * The iDangero.us',
  ' * http://www.idangero.us/',
  ' * ',
  ' * Licensed under <%= pkg.license %>',
  ' * ',
  ' * Released on: <%= date.month %> <%= date.day %>, <%= date.year %>',
  ' */',
  ''].join('\n');


// Build JS Files
function buildJs(cb) {
  rollup({
    entry: './src/js/framework7.js',
    plugins: [
      resolve({
        jsnext: true,
      }),
      buble(),
    ],
    format: 'umd',
    moduleName: 'Framework7',
    useStrict: true,
    sourceMap: true,
  })
  .pipe(source('framework7.js', './src'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./build/js/'))
  .on('end', () => {
    if (cb) cb();
  });
}

// Build Less Files
function buildLess(cb) {
  gulp.src('./src/less/framework7.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')],
    }))
    .pipe(gulp.dest('./build/css/'))
    .on('end', () => {
      if (cb) cb();
    });
}

// Tasks
gulp.task('js', (cb) => {
  buildJs(cb);
});

gulp.task('less', (cb) => {
  buildLess(cb);
});

gulp.task('build', ['js', 'less']);

gulp.task('watch', () => {
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./src/less/*/*.less', ['less']);
});

gulp.task('connect', () => connect.server({
  root: ['./'],
  livereload: true,
  port: '3000',
}));

gulp.task('open', () => gulp.src('./index.html').pipe(open({ uri: 'http://localhost:3000/index.html' })));

gulp.task('server', ['watch', 'connect', 'open']);

gulp.task('default', ['server']);

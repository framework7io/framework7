(function(){
  'use strict';
  var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    header = require('gulp-header'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rollup = require('rollup-stream'),
    buble = require('rollup-plugin-buble'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    rename = require('gulp-rename'),
    resolve = require('rollup-plugin-node-resolve'),
    pkg = require('./package.json'),
    banner = [
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

  gulp.task('build', function (cb) {
    rollup({
      entry: './src/js/framework7.js',
      plugins: [
        resolve({
          jsnext: true
        }),
        buble()
      ],
      format: 'umd',
      moduleName: 'Framework7',
      useStrict: true,
      sourceMap: true
    })
    .pipe(source('framework7.js', './src'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/'))
    .on('end', function () {
        cb();
    });
  });

  gulp.task('watch', function () {
    gulp.watch('./src/js/*.js', ['build']);
  });

  gulp.task('connect', function () {
    return connect.server({
      root: [ './' ],
      livereload: true,
      port:'3000'
    });
  });

  gulp.task('open', function () {
      return gulp.src('./index.html').pipe(open({ uri: 'http://localhost:3000/index.html'}));
  });

  gulp.task('server', [ 'watch', 'connect', 'open' ]);

  gulp.task('default', [ 'server' ]);

  gulp.task('test', [ 'build' ]);
})();

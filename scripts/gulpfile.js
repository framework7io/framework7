/* eslint no-console: ["error", { allow: ["log"] }] */
const gulp = require('gulp');
const connect = require('gulp-connect');
const gopen = require('gulp-open');
const fs = require('fs');
const diff = require('diff');
const modifyFile = require('gulp-modify-file');

const buildJs = require('./build-js.js');
const buildLess = require('./build-less.js');

gulp.task('diff', () => {
  const file = process.argv.slice(3).toString().replace('-', '');
  const ios = fs.readFileSync('./src/_less-old/ios/' + file + '.less', 'utf8');
  const md = fs.readFileSync('./src/_less-old/material/' + file + '.less', 'utf8');
  const result = diff.diffLines(ios, md);

  result.forEach((part) => {
    // green for additions, red for deletions
    // grey for common parts
    let color = '\x1b[37m%s\x1b[0m';
    if (part.added) {
      color = '\x1b[31m%s\x1b[0m';
    } else if (part.removed) {
      color = '\x1b[32m%s\x1b[0m';
    }
    console.log(color, part.value);
  });
});

// Tasks
gulp.task('ks', (cb) => {
  const env = process.env.NODE_ENV || 'development';
  gulp.src('./kitchen-sink/index.html')
    .pipe(modifyFile((content) => {
      if (env === 'development') {
        return content
          .replace('../dist/css/framework7.min.css', '../build/css/framework7.css')
          .replace('../dist/js/framework7.min.js', '../build/js/framework7.js');
      }
      return content
        .replace('../build/css/framework7.css', '../dist/css/framework7.min.css')
        .replace('../build/js/framework7.js', '../dist/js/framework7.min.js');
    }))
    .pipe(gulp.dest('./kitchen-sink/'))
    .on('end', () => {
      if (cb) cb();
    });
});
gulp.task('js', (cb) => {
  buildJs(cb);
});

gulp.task('less', (cb) => {
  buildLess(cb);
});

gulp.task('build', ['js', 'less']);

gulp.task('watch', () => {
  gulp.watch('./src/**/**/*.js', ['js']);
  gulp.watch('./src/**/**/*.less', ['less']);
});

gulp.task('connect', () => {
  connect.server({
    root: ['./'],
    livereload: true,
    port: '3000',
  });
});

gulp.task('open', () => {
  gulp.src('./kitchen-sink/index.html').pipe(gopen({ uri: 'http://localhost:3000/kitchen-sink/' }));
});

gulp.task('server', ['watch', 'connect', 'open']);

gulp.task('default', ['server']);

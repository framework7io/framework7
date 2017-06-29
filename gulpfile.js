const gulp = require('gulp');
const connect = require('gulp-connect');
const gopen = require('gulp-open');
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
const fs = require('fs');
const diff = require('diff');
const autoprefixer = require('gulp-autoprefixer');

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
  'use strict';
  rollup({
    entry: './src/framework7.js',
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
  .on('error', (err) => {
    console.log(err.toString());
    if (cb) cb();
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
  'use strict';
  gulp.src('./src/framework7.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')],
    }))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .on('error', (err) => {
      console.log(err.toString());
      if (cb) cb();
    })
    .pipe(gulp.dest('./build/css/'))
    .on('end', () => {
      if (cb) cb();
    });
}

gulp.task('diff', () => {
  'use strict';
  var file = process.argv.slice(3).toString().replace('-', '');
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
gulp.task('js', (cb) => {
  'use strict';
  buildJs(cb);
});

gulp.task('less', (cb) => {
  'use strict';
  buildLess(cb);
});

gulp.task('build', ['js', 'less']);

gulp.task('watch', () => {
  'use strict';
  gulp.watch('./src/**/**/*.js', ['js']);
  gulp.watch('./src/**/**/*.less', ['less']);
});

gulp.task('connect', () => {
  'use strict';
  connect.server({
    root: ['./'],
    livereload: true,
    port: '3000',
  });
});

gulp.task('open', () => {
  'use strict';
  gulp.src('./kitchen-sink/index.html').pipe(gopen({ uri: 'http://localhost:3000/kitchen-sink/' }));
});

gulp.task('server', ['watch', 'connect', 'open']);

gulp.task('default', ['server']);

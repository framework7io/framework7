/* eslint no-console: ["error", { allow: ["log"] }] */
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
const replace = require('rollup-plugin-replace');
const cleanCSS = require('gulp-clean-css');
const modifyFile = require('gulp-modify-file');

const config = require('./config.js');

const banner = [
  '/**',
  ' * Framework7 <%= pkg.version %>',
  ' * <%= pkg.description %>',
  ' * <%= pkg.homepage %>',
  ' * ',
  ' * Copyright 2014-<%= date.year %> <%= pkg.author %>',
  ' * ',
  ' * Released under the <%= pkg.license %> License',
  ' * ',
  ' * Released on: <%= date.month %> <%= date.day %>, <%= date.year %>',
  ' */',
  ''].join('\n');

const date = {
  year: new Date().getFullYear(),
  month: ('January February March April May June July August September October November December').split(' ')[new Date().getMonth()],
  day: new Date().getDate(),
};

// Build JS Files
function buildJsEsModule(cb) {
  const env = process.env.NODE_ENV || 'development';
  rollup({
    entry: './src/framework7.js',
    plugins: [
      buble(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
      }),
    ],
    format: 'es',
    moduleName: 'Framework7',
    useStrict: true,
    sourceMap: false,
  })
    .on('error', (err) => {
      if (cb) cb();
      console.log(err.toString());
    })
    .pipe(source('framework7.js', './src'))
    .pipe(buffer())
    .pipe(header(banner, { pkg, date }))
    .pipe(rename('framework7.module.js'))
    .pipe(gulp.dest(`./${env === 'development' ? 'build' : 'dist'}/js/`))
    .on('end', () => {
      if (cb) cb();
    });
}
function buildJs(cb) {
  const env = process.env.NODE_ENV || 'development';

  /*
  let jsFileContent = fs.readFileSync('./src/framework7.js', 'utf8');
  const jsComponents = [];
  config.components.forEach((name) => {
    const capitalized = name.split('-').map((word) => {
      return word.split('').map((char, index) => {
        if (index === 0) return char.toUpperCase();
        return char;
      }).join('');
    }).join('');
    const jsFilePath = `./src/components/${name}/${name}.js`;
    if (fs.existsSync(jsFilePath)) {
      jsComponents.push({ name, capitalized });
    }
  });

  jsFileContent = jsFileContent
    .replace('/* IMPORTS *\/', jsComponents.map((component) => {
      return `import ${component.capitalized} from './components/${component.name}/${component.name}';`;
    }).join('\n'))
    .replace('/* INSTALLS *\/', jsComponents.map((component) => {
      return `.use(${component.capitalized})`;
    }).join('\n  '));

  fs.writeFileSync('./src/framework7.temp.js', jsFileContent);

  return;
  */

  rollup({
    entry: './src/framework7.js',
    plugins: [
      resolve({ jsnext: true }),
      buble(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
      }),
    ],
    format: 'umd',
    moduleName: 'Framework7',
    useStrict: true,
    sourceMap: true,
  })
    .on('error', (err) => {
      if (cb) cb();
      console.log(err.toString());
    })
    .pipe(source('framework7.js', './src'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(header(banner, { pkg, date }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`./${env === 'development' ? 'build' : 'dist'}/js/`))
    .on('end', () => {
      if (env === 'development') {
        if (cb) cb();
        return;
      }
      gulp.src('./dist/js/framework7.js')
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(header(banner, { pkg, date }))
        .pipe(rename((filePath) => {
          /* eslint no-param-reassign: ["error", { "props": false }] */
          filePath.basename += '.min';
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'))
        .on('end', () => {
          buildJsEsModule(cb);
        });
    });
}

// Build Less Files
function buildLess(cb) {
  const env = process.env.NODE_ENV || 'development';

  /*
  let lessFileContent = fs.readFileSync('./src/framework7.less', 'utf8');

  const lessComponents = [];
  config.components.forEach((name) => {
    const lessFilePath = `./src/components/${name}/${name}.less`;
    if (fs.existsSync(lessFilePath)) {
      lessComponents.push(name);
    }
  });

  lessFileContent = lessFileContent
    .replace('// IMPORTS', lessComponents.map((component) => {
      return `@import url('./components/${component}/${component}.less');`;
    }).join('\n'));

  fs.writeFileSync('./src/framework7.temp.less', lessFileContent);

  return;
  */

  gulp.src('./src/framework7.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')],
    }))
    .on('error', (err) => {
      if (cb) cb();
      console.log(err.toString());
    })
    .pipe(autoprefixer({
      cascade: false,
    }))
    .on('error', (err) => {
      if (cb) cb();
      console.log(err.toString());
    })
    .pipe(header(banner, { pkg, date }))
    .pipe(gulp.dest(`./${env === 'development' ? 'build' : 'dist'}/css/`))
    .on('end', () => {
      if (env === 'development') {
        if (cb) cb();
        return;
      }
      gulp.src('./dist/css/framework7.css')
        .pipe(cleanCSS({
          advanced: false,
          aggressiveMerging: false,
        }))
        .pipe(header(banner, { pkg, date }))
        .pipe(rename((filePath) => {
          /* eslint no-param-reassign: ["error", { "props": false }] */
          filePath.basename += '.min';
        }))
        .pipe(gulp.dest('./dist/css/'))
        .on('end', () => {
          if (cb) cb();
        });
    });
}

gulp.task('diff', () => {
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
gulp.task('ks', (cb) => {
  const env = process.env.NODE_ENV || 'development';
  gulp.src('./kitchen-sink/index.html')
    .pipe(modifyFile((content) => {
      if (env === 'development') {
        return content
          .replace('../dist/css/framework7.min.css', '../build/css/framework7.css')
          .replace('../dist/js/framework7.min.js', '../build/js/framework7.js');
      }
      console.log('here', content);
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

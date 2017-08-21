/* eslint no-console: ["error", { allow: ["log"] }] */
const gulp = require('gulp');
const connect = require('gulp-connect');
const gopen = require('gulp-open');
const header = require('gulp-header');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
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

const releaseDate = {
  day: new Date().getDate(),
  month: ('January February March April May June July August September October November December').split(' ')[new Date().getMonth()],
  year: new Date().getFullYear(),
};
const banner = `${`
/**
 * Framework7 ${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * Copyright 2014-${releaseDate.year} ${pkg.author}
 *
 * Released under the ${pkg.license} License
 *
 * Released on: ${releaseDate.month} ${releaseDate.day}, ${releaseDate.year}
 */
`.trim()}\n`;

// Build JS Files
function buildJsEsModule(components, cb) {
  const env = process.env.NODE_ENV || 'development';
  rollup({
    entry: './src/framework7.js',
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        '//IMPORT_COMPONENTS': components.map(component => `import ${component.capitalized} from './components/${component.name}/${component.name}';`).join('\n'),
        '//INSTALL_COMPONENTS': components.map(component => `.use(${component.capitalized})`).join('\n  '),
      }),
      buble(),
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
    .pipe(header(banner))
    .pipe(rename('framework7.module.js'))
    .pipe(gulp.dest(`./${env === 'development' ? 'build' : 'dist'}/js/`))
    .on('end', () => {
      if (cb) cb();
    });
}
function buildJSUmdModule(components, cb) {
  const env = process.env.NODE_ENV || 'development';
  rollup({
    entry: './src/framework7.js',
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        '//IMPORT_COMPONENTS': components.map(component => `import ${component.capitalized} from './components/${component.name}/${component.name}';`).join('\n'),
        '//INSTALL_COMPONENTS': components.map(component => `.use(${component.capitalized})`).join('\n  '),
      }),
      resolve({ jsnext: true }),
      buble(),
    ],
    format: 'umd',
    moduleName: 'Framework7',
    useStrict: true,
    sourceMap: env === 'development',
  })
    .on('error', (err) => {
      if (cb) cb();
      console.log(err.toString());
    })
    .pipe(source('framework7.js', './src'))
    .pipe(buffer())
    .pipe(gulpif(env === 'development', sourcemaps.init()))
    .pipe(header(banner))
    .pipe(gulpif(env === 'development', sourcemaps.write('./')))
    .pipe(gulp.dest(`./${env === 'development' ? 'build' : 'dist'}/js/`))
    .on('end', () => {
      if (env === 'development') {
        if (cb) cb();
        return;
      }
      // Minified version
      gulp.src('./dist/js/framework7.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(header(banner))
        .pipe(rename((filePath) => {
          /* eslint no-param-reassign: ["error", { "props": false }] */
          filePath.basename += '.min';
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'))
        .on('end', () => {
          cb();
        });
    });
}
function buildJs(cb) {
  const env = process.env.NODE_ENV || 'development';

  // let jsFileContent = fs.readFileSync('./src/framework7.js', 'utf8');
  const components = [];
  config.components.forEach((name) => {
    const capitalized = name.split('-').map((word) => {
      return word.split('').map((char, index) => {
        if (index === 0) return char.toUpperCase();
        return char;
      }).join('');
    }).join('');
    const jsFilePath = `./src/components/${name}/${name}.js`;
    if (fs.existsSync(jsFilePath)) {
      components.push({ name, capitalized });
    }
  });

  const expectCbs = env === 'development' ? 1 : 2;
  let cbs = 0;

  buildJSUmdModule(components, () => {
    cbs += 1;
    if (cbs === expectCbs) cb();
  });

  if (env === 'production') {
    buildJsEsModule(components, () => {
      cbs += 1;
      if (cbs === expectCbs) cb();
    });
  }
}

// Build Less Files
function buildLess(cb, buildTheme) {
  const env = process.env.NODE_ENV || 'development';

  const components = [];
  config.components.forEach((name) => {
    const lessFilePath = `./src/components/${name}/${name}.less`;
    if (fs.existsSync(lessFilePath)) {
      components.push(name);
    }
  });

  const themes = buildTheme ? [buildTheme] : config.themes;

  gulp.src('./src/framework7.less')
    .pipe(modifyFile((content) => {
      const newContent = content
        .replace('//IMPORT_COMPONENTS', components.map(component => `@import url('./components/${component}/${component}.less');`).join('\n'))
        .replace(/@include-ios-theme: (true|false);/, `@include-ios-theme: ${themes.indexOf('ios') >= 0 ? 'true' : 'false'};`)
        .replace(/@include-md-theme: (true|false);/, `@include-md-theme: ${themes.indexOf('md') >= 0 ? 'true' : 'false'};`);
      return newContent;
    }))
    .pipe(less())
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
    .pipe(header(banner))
    .pipe(rename((filePath) => {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      filePath.basename = buildTheme ? `framework7.${buildTheme}` : 'framework7';
    }))
    .pipe(gulp.dest(`./${env === 'development' ? 'build' : 'dist'}/css/`))
    .on('end', () => {
      if (env === 'development') {
        if (cb) cb();
        return;
      }
      gulp.src(`./dist/css/${buildTheme ? `framework7.${buildTheme}` : 'framework7'}.css`)
        .pipe(cleanCSS({
          advanced: false,
          aggressiveMerging: false,
        }))
        .pipe(header(banner))
        .pipe(rename((filePath) => {
          /* eslint no-param-reassign: ["error", { "props": false }] */
          filePath.basename += '.min';
        }))
        .pipe(gulp.dest('./dist/css/'))
        .on('end', () => {
          if (buildTheme && cb) {
            cb();
            return;
          }
          let cbs = 0;
          const expectCbs = themes.length;
          themes.forEach((theme) => {
            buildLess(() => {
              cbs += 1;
              if (cbs === expectCbs && cb) cb();
            }, theme);
            buildLess(() => {
              cbs += 1;
              if (cbs === expectCbs && cb) cb();
            }, theme);
          });
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

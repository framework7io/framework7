<<<<<<< HEAD
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
    .on('error', (err) => {
      console.log(err.toString());
      if (cb) cb();
    })
    .pipe(gulp.dest('./build/css/'))
    .on('end', () => {
      if (cb) cb();
=======
(function(){
    'use strict';
    var gulp = require('gulp'),
        connect = require('gulp-connect'),
        open = require('gulp-open'),
        less = require('gulp-less'),
        jade = require('gulp-jade'),
        rename = require('gulp-rename'),
        header = require('gulp-header'),
        path = require('path'),
        uglify = require('gulp-uglify'),
        sourcemaps = require('gulp-sourcemaps'),
        cleanCSS = require('gulp-clean-css'),
        tap = require('gulp-tap'),
        concat = require('gulp-concat'),
        jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish'),
        rollup = require('rollup-stream'),
        buble = require('rollup-plugin-buble'),
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer'),
        fs = require('fs'),
        paths = {
            root: './',
            build: {
                root: 'build/',
                styles: 'build/css/',
                scripts: 'build/js/'
            },
            custom: {
                root: 'custom/',
                styles: 'custom/css/',
                scripts: 'custom/js/'
            },
            dist: {
                root: 'dist/',
                styles: 'dist/css/',
                scripts: 'dist/js/'
            },
            ks: {
                ios : {
                    root: 'kitchen-sink-ios/',
                    css: 'kitchen-sink-ios/css/',
                    jade: 'kitchen-sink-ios/jade/*.jade',
                    less: 'kitchen-sink-ios/less/*.less'
                },
                material : {
                    root: 'kitchen-sink-material/',
                    css: 'kitchen-sink-material/css/',
                    jade: 'kitchen-sink-material/jade/*.jade',
                    less: 'kitchen-sink-material/less/*.less'
                }
            },
            source: {
                root: 'src/',
                styles: {
                    ios: 'src/less/ios/',
                    material: 'src/less/material/'
                },
                scripts: ['src/js/*.js', 'src/js/*/*.js']
            },
            examples: {
                root: 'examples/',
                list: ['inline-pages', 'split-view', 'split-view-panel', 'tab-bar', 'template7-pages']
            }
        },
        f7 = {
            filename: 'framework7',
            jsFiles: [
                'src/js/dom7/dom7.js',
                'src/js/template7/template7.js',
                'src/js/wrap-start.js',
                'src/js/framework7/f7-intro.js',
                'src/js/framework7/views.js',
                'src/js/framework7/navbars.js',
                'src/js/framework7/searchbar.js',
                'src/js/framework7/messagebar.js',
                'src/js/framework7/xhr.js',
                'src/js/framework7/pages.js',
                'src/js/framework7/router.js',
                'src/js/framework7/modals.js',
                'src/js/framework7/progressbar.js',
                'src/js/framework7/panels.js',
                'src/js/framework7/lazy-load.js',
                'src/js/framework7/material-preloader.js',
                'src/js/framework7/messages.js',
                'src/js/framework7/swipeout.js',
                'src/js/framework7/sortable.js',
                'src/js/framework7/smart-select.js',
                'src/js/framework7/virtual-list.js',
                'src/js/framework7/pull-to-refresh.js',
                'src/js/framework7/infinite-scroll.js',
                'src/js/framework7/scroll-toolbars.js',
                'src/js/framework7/material-tabbar.js',
                'src/js/framework7/tabs.js',
                'src/js/framework7/accordion.js',
                'src/js/framework7/fast-clicks.js',
                'src/js/framework7/clicks.js',
                'src/js/framework7/resize.js',
                'src/js/framework7/forms-storage.js',
                'src/js/framework7/forms-ajax.js',
                'src/js/framework7/forms-textarea.js',
                'src/js/framework7/material-inputs.js',
                'src/js/framework7/push-state.js',
                'src/js/framework7/swiper-init.js',
                'src/js/framework7/photo-browser.js',
                'src/js/framework7/autocomplete.js',
                'src/js/framework7/picker.js',
                'src/js/framework7/calendar.js',
                'src/js/framework7/notifications.js',
                'src/js/framework7/data-table.js',
                'src/js/framework7/template7-templates.js',
                'src/js/framework7/plugins.js',
                'src/js/framework7/init.js',
                'src/js/framework7/f7-outro.js',
                'src/js/framework7/proto-support.js',
                'src/js/framework7/proto-device.js',
                'src/js/framework7/proto-plugins.js',
                'src/js/swiper/swiper.js',
                'src/js/wrap-end.js',
            ],
            modules: require('./modules.json'),
            pkg: require('./package.json'),
            banner: [
                '/**',
                ' * Framework7 <%= pkg.version %>',
                ' * <%= pkg.description %>',
                '<% if(typeof(theme) !== "undefined") {%> * \n * <%= theme %>\n *<% } else { %> * <% } %>',
                // ' * ',
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
                ''].join('\n'),
            customBanner: [
                '/**',
                ' * Framework7 <%= pkg.version %> - Custom Build',
                ' * <%= pkg.description %>',
                '<% if(typeof(theme) !== "undefined") {%> * \n * <%= theme %>\n *<% } else { %> * <% } %>',
                ' * ',
                ' * Included modules: <%= modulesList %>',
                ' * ',
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
                ''].join('\n'),
            date: {
                year: new Date().getFullYear(),
                month: ('January February March April May June July August September October November December').split(' ')[new Date().getMonth()],
                day: new Date().getDate()
            }

        };

    function addJSIndent (file, t) {
        var addIndent = '        ';
        var filename = file.path.split('src/js/')[1];
        if (filename === 'wrap-start.js' || filename === 'wrap-end.js' || filename === 'dom7/dom7.js' || filename === 'template7/template7.js') {
            addIndent = '';
        }
        var add4spaces = ('framework7/f7-intro.js framework7/f7-outro.js framework7/proto-device.js framework7/proto-plugins.js framework7/proto-support.js swiper/swiper.js').split(' ');
        if (add4spaces.indexOf(filename) >= 0) {
            addIndent = '    ';
        }
        // var add8spaces = ('dom7/dom7-methods.js dom7/dom7-ajax.js dom7/dom7-utils.js').split(' ');
        // if (add8spaces.indexOf(filename) >= 0) {
        //     addIndent = '        ';
        // }
        if (addIndent !== '') {
            var fileLines = fs.readFileSync(file.path).toString().split('\n');
            var newFileContents = '';
            for (var i = 0; i < fileLines.length; i++) {
                newFileContents += addIndent + fileLines[i] + (i === fileLines.length ? '' : '\n');
            }
            file.contents = new Buffer(newFileContents);
        }
    }
    /* ==================================================================
    Build Framework7
    ================================================================== */
    gulp.task('dom7', function (cb) {
        rollup({
            entry: './node_modules/dom7/src/dom7.js',
            plugins: [buble()],
            format: 'iife',
            moduleName: 'Dom7',
            useStrict: true,
        })
        .pipe(source('dom7.js', './node_modules/dom7/src'))
        .pipe(buffer())
        .pipe(gulp.dest('./src/js/dom7/'))
        .on('end', function () {
            var fileContent = fs.readFileSync('./src/js/dom7/dom7.js', 'utf-8');
            fs.writeFileSync('./src/js/dom7/dom7.js', fileContent.replace('var Dom7 = (function () {', 'window.Dom7 = (function () {'))
            cb();
        });
    });
    gulp.task('template7', function (cb) {
        rollup({
            entry: './node_modules/template7/src/template7.js',
            plugins: [buble()],
            format: 'iife',
            moduleName: 'Template7',
            useStrict: true,
        })
        .pipe(source('template7.js', './node_modules/template7/src'))
        .pipe(buffer())
        .pipe(gulp.dest('./src/js/template7/'))
        .on('end', function () {
            var fileContent = fs.readFileSync('./src/js/template7/template7.js', 'utf-8');
            fs.writeFileSync('./src/js/template7/template7.js', fileContent.replace('var Template7 = (function () {', 'window.Template7 = (function () {'))
            cb();
        });
    });
    // Build Styles and Scripts
    gulp.task('scripts', function (cb) {
        gulp.src(f7.jsFiles)
            .pipe(tap(function (file, t){
                addJSIndent (file, t);
            }))
            .pipe(sourcemaps.init())
            .pipe(concat(f7.filename + '.js'))
            .pipe(header(f7.banner, { pkg : f7.pkg, date: f7.date } ))
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.build.scripts))
            .pipe(connect.reload())
            .on('end', function () {
                cb();
            });

    });
    gulp.task('styles-ios', function (cb) {
        var cbs = 0;
        ['framework7.ios.less', 'framework7.ios.rtl.less', 'framework7.ios.colors.less'].forEach(function(lessFilePath, b){
            lessFilePath = paths.source.styles.ios + lessFilePath;
            gulp.src([lessFilePath])
                .pipe(less({
                    paths: [ path.join(__dirname, 'less', 'includes') ]
                }))
                .pipe(header(f7.banner, { pkg : f7.pkg, date: f7.date, theme: 'iOS Theme' }))
                .pipe(gulp.dest(paths.build.styles))
                .pipe(connect.reload())
                .on('end', function () {
                    cbs ++;
                    if (cbs === 3) cb();
                });
        });
    });
    gulp.task('styles-material', function (cb) {
        var cbs = 0;
        ['framework7.material.less', 'framework7.material.rtl.less', 'framework7.material.colors.less'].forEach(function(lessFilePath, b){
            lessFilePath = paths.source.styles.material + lessFilePath;
            gulp.src([lessFilePath])
                .pipe(less({
                    paths: [ path.join(__dirname, 'less', 'includes') ]
                }))
                .pipe(header(f7.banner, { pkg : f7.pkg, date: f7.date, theme: 'Google Material Theme' }))
                .pipe(gulp.dest(paths.build.styles))
                .pipe(connect.reload())
                .on('end', function () {
                    cbs ++;
                    if (cbs === 3) cb();
                });
        });

    });

    // F7 Demo App
    gulp.task('demo-app', function (cb) {
        gulp.src(paths.source.root + 'templates/*.jade')
            .pipe(jade({
                pretty: true,
                locals: {
                    stylesheetFilename: 'framework7.ios',
                    stylesheetColorsFilename: 'framework7.ios.colors',
                    scriptFilename: 'framework7'
                }
            }))
            .pipe(gulp.dest(paths.build.root));
        gulp.src(paths.source.root + 'my-app/my-app.js')
            .pipe(gulp.dest(paths.build.scripts));

        gulp.src(paths.source.root + 'my-app/my-app.css')
            .pipe(gulp.dest(paths.build.styles));

        gulp.src(paths.source.root + 'img/*.*')
            .pipe(gulp.dest(paths.build.root + 'img/'))
            .pipe(connect.reload());
        cb();
    });

    gulp.task('build', ['scripts', 'styles-ios', 'styles-material', 'demo-app'], function (cb) {
        cb();
    });

    /* ==================================================================
    Kitchen Sink IOS
    ================================================================== */
    gulp.task('ks-ios-jade', function (cb) {
        gulp.src(paths.ks.ios.jade)
            .pipe(jade({
                pretty: true,
                data: {
                    icons: require('./manifest-icons-ios.json').icons
                }
            }))
            .pipe(gulp.dest(paths.ks.ios.root))
            .pipe(connect.reload())
            .on('end', function () {
                cb();
            });
    });
    gulp.task('ks-ios-less', function (cb) {
        gulp.src(paths.ks.ios.less)
            .pipe(less({
                paths: [ path.join(__dirname, 'less', 'includes') ]
            }))
            .pipe(gulp.dest(paths.ks.ios.css))
            .pipe(connect.reload())
            .on('end', function () {
                cb();
            });
    });
    /* ==================================================================
    Kitchen Sink Material
    ================================================================== */
    gulp.task('ks-material-jade', function (cb) {
        gulp.src(paths.ks.material.jade)
            .pipe(jade({
                pretty: true,
                data: {
                    icons: require('./manifest-icons-material.json').icons
                }
            }))
            .pipe(gulp.dest(paths.ks.material.root))
            .pipe(connect.reload())
            .on('end', function () {
                cb();
            });
    });
    gulp.task('ks-material-less', function (cb) {
        gulp.src(paths.ks.material.less)
            .pipe(less({
                paths: [ path.join(__dirname, 'less', 'includes') ]
            }))
            .pipe(gulp.dest(paths.ks.material.css))
            .pipe(connect.reload())
            .on('end', function () {
                cb();
            });
>>>>>>> nolimits4web/master
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
  gulp.src('./index.html').pipe(gopen({ uri: 'http://localhost:3000/' }));
});

gulp.task('server', ['watch', 'connect', 'open']);

gulp.task('default', ['server']);

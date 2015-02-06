(function(){
    'use strict';    
    var gulp = require('gulp'),
        gutil = require('gulp-util'),
        connect = require('gulp-connect'),
        open = require('gulp-open'),
        less = require('gulp-less'),
        jade = require('gulp-jade'),
        rename = require('gulp-rename'),
        header = require('gulp-header'),
        path = require('path'),
        uglify = require('gulp-uglify'),
        sourcemaps = require('gulp-sourcemaps'),
        minifyCSS = require('gulp-minify-css'),
        tap = require('gulp-tap'),
        concat = require('gulp-concat'),
        jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish'),
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
                scripts: 'custom/js/',
            },
            dist: {
                root: 'dist/',
                styles: 'dist/css/',
                scripts: 'dist/js/'
            },
            ks: {
                root: 'kitchen-sink/',
                css: 'kitchen-sink/css/',
                jade: 'kitchen-sink/jade/*.jade',
                less: 'kitchen-sink/less/*.less',
            },
            source: {
                root: 'src/',
                styles: 'src/less/',
                scripts: 'src/js/*.js'
            },
            examples: {
                root: 'examples/',
                list: ['inline-pages', 'split-view', 'split-view-panel', 'tab-bar', 'template7-pages']
            },
            apps: {
                root: 'apps/',
                list: ['todo7', 'weather7']
            }
        },
        f7 = {
            filename: 'framework7',
            jsFiles: [
                'src/js/wrap-start.js',
                'src/js/f7-intro.js',
                'src/js/views.js',
                'src/js/navbars.js',
                'src/js/searchbar.js',
                'src/js/messagebar.js',
                'src/js/xhr.js',
                'src/js/pages.js',
                'src/js/router.js',
                'src/js/modals.js',
                'src/js/panels.js',
                'src/js/lazy-load.js',
                'src/js/messages.js',
                'src/js/swipeout.js',
                'src/js/sortable.js',
                'src/js/smart-select.js',
                'src/js/virtual-list.js',
                'src/js/pull-to-refresh.js',
                'src/js/infinite-scroll.js',
                'src/js/scroll-toolbars.js',
                'src/js/tabs.js',
                'src/js/accordion.js',
                'src/js/fast-clicks.js',
                'src/js/clicks.js',
                'src/js/resize.js',
                'src/js/forms-handler.js',
                'src/js/push-state.js',
                'src/js/swiper-init.js',
                'src/js/photo-browser.js',
                'src/js/picker.js',
                'src/js/calendar.js',
                'src/js/notifications.js',
                'src/js/template7-templates.js',
                'src/js/plugins.js',
                'src/js/init.js',
                'src/js/f7-outro.js',
                'src/js/dom7-intro.js',
                'src/js/dom7-methods.js',
                'src/js/dom7-ajax.js',
                'src/js/dom7-utils.js',
                'src/js/dom7-outro.js',
                'src/js/proto-support.js',
                'src/js/proto-device.js',
                'src/js/proto-plugins.js',
                'src/js/template7.js',
                'src/js/swiper.js',
                'src/js/wrap-end.js'
            ],
            modules: require('./modules.json'),
            pkg: require('./bower.json'),
            banner: [
                '/**',
                ' * <%= pkg.name %> <%= pkg.version %>',
                ' * <%= pkg.description %>',
                ' * ',
                ' * <%= pkg.homepage %>',
                ' * ',
                ' * Copyright <%= date.year %>, <%= pkg.author %>',
                ' * The iDangero.us',
                ' * http://www.idangero.us/',
                ' * ',
                ' * Licensed under <%= pkg.license.join(" & ") %>',
                ' * ',
                ' * Released on: <%= date.month %> <%= date.day %>, <%= date.year %>',
                ' */',
                ''].join('\n'),
            customBanner: [
                '/**',
                ' * <%= pkg.name %> <%= pkg.version %> - Custom Build',
                ' * <%= pkg.description %>',
                ' * ',
                ' * Included modules: <%= modulesList %>',
                ' * ',
                ' * <%= pkg.homepage %>',
                ' * ',
                ' * Copyright <%= date.year %>, <%= pkg.author %>',
                ' * The iDangero.us',
                ' * http://www.idangero.us/',
                ' * ',
                ' * Licensed under <%= pkg.license.join(" & ") %>',
                ' * ',
                ' * Released on: <%= date.month %> <%= date.day %>, <%= date.year %>',
                ' */',
                ''].join('\n'),
            date: {
                year: new Date().getFullYear(),
                month: ('January February March April May June July August September October November December').split(' ')[new Date().getMonth()],
                day: new Date().getDate()
            },

        };
        
    function addJSIndent (file, t) {
        var addIndent = '        ';
        var filename = file.path.split('src/js/')[1];
        if (filename === 'wrap-start.js' || filename === 'wrap-end.js') {
            addIndent = '';
        }
        var add4spaces = ('f7-intro.js f7-outro.js proto-device.js proto-plugins.js proto-support.js dom7-intro.js dom7-outro.js template7.js swiper.js').split(' ');
        if (add4spaces.indexOf(filename) >= 0) {
            addIndent = '    ';
        }
        var add8spaces = ('dom7-methods.js dom7-ajax.js dom7-utils.js').split(' ');
        if (add8spaces.indexOf(filename) >= 0) {
            addIndent = '        ';
        }
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
    gulp.task('styles', function (cb) {
        gulp.src([paths.source.styles + 'framework7.less', paths.source.styles + 'framework7.rtl.less', paths.source.styles + 'framework7.themes.less'])
            .pipe(less({
                paths: [ path.join(__dirname, 'less', 'includes') ]
            }))
            .pipe(header(f7.banner, { pkg : f7.pkg, date: f7.date }))
            .pipe(gulp.dest(paths.build.styles))
            .pipe(connect.reload())
            .on('end', function () {
                cb();
            });
    });

    // F7 Demo App
    gulp.task('demo-app', function (cb) {
        gulp.src(paths.source.root + 'templates/*.jade')
            .pipe(jade({
                pretty: true,
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

    gulp.task('build', ['scripts', 'styles', 'demo-app'], function (cb) {
        cb();
    });

    /* ==================================================================
    Kitchen Sink
    ================================================================== */
    gulp.task('ks-jade', function (cb) {
        gulp.src(paths.ks.jade)
            .pipe(jade({
                pretty: true,
            }))
            .pipe(gulp.dest(paths.ks.root))
            .pipe(connect.reload());
        cb();
    });
    gulp.task('ks-less', function (cb) {
        gulp.src(paths.ks.less)
            .pipe(less({
                paths: [ path.join(__dirname, 'less', 'includes') ]
            }))
            .pipe(gulp.dest(paths.ks.css))
            .pipe(connect.reload());
        cb();
    });

    /* ==================================================================
    Examples
    ================================================================== */
    gulp.task('examples', function (cb) {
        for (var i = 0; i < paths.examples.list.length; i++) {
            var exampleRoot = paths.examples.root + paths.examples.list[i] + '/';
            gulp.src(exampleRoot + 'jade/*.jade')
                .pipe(jade({
                    pretty: true,
                }))
                .pipe(gulp.dest(exampleRoot));
            gulp.src(exampleRoot + 'less/*.less')
                .pipe(less({
                    paths: [ path.join(__dirname, 'less', 'includes') ]
                }))
                .pipe(gulp.dest(exampleRoot + 'css/'))
                .pipe(connect.reload());
        }
        cb();
    });

    /* =================================
    Apps
    ================================= */
    gulp.task('apps', function (cb) {
        for (var i = 0; i < paths.apps.list.length; i++) {
            var appRoot = paths.apps.root + paths.apps.list[i] + '/';
            gulp.src(appRoot + 'jade/*.jade')
                .pipe(jade({
                    pretty: true,
                }))
                .pipe(gulp.dest(appRoot));
            gulp.src(appRoot + 'less/*.less')
                .pipe(less({
                    paths: [ path.join(__dirname, 'less', 'includes') ]
                }))
                .pipe(gulp.dest(appRoot + 'css/'))
                .pipe(connect.reload());
        }
        cb();
    });

    /* =================================
    Dist Version
    ================================= */
    gulp.task('dist', function () {
        gulp.src([paths.build.root + '**/*.*'])
            .pipe(gulp.dest(paths.dist.root))
            .on('end', function () {
                // Minify JS
                gulp.src([paths.dist.scripts + f7.filename + '.js'])
                    .pipe(sourcemaps.init())
                    .pipe(uglify())
                    .pipe(header(f7.banner, { pkg : f7.pkg, date: f7.date }))
                    .pipe(rename(function(path) {
                        path.basename = f7.filename + '.min';
                    }))
                    .pipe(sourcemaps.write('./'))
                    .pipe(gulp.dest(paths.dist.scripts));

                // Minify CSS
                var minifiedCSS = [
                    paths.dist.styles + f7.filename + '.css', 
                    paths.dist.styles + f7.filename + '.rtl.css', 
                    paths.dist.styles + f7.filename + '.themes.css'
                ];
                gulp.src(minifiedCSS)
                    .pipe(minifyCSS())
                    .pipe(header(f7.banner, { pkg : f7.pkg, date: f7.date }))
                    .pipe(rename(function(path) {
                        path.basename = path.basename + '.min';
                    }))
                    .pipe(gulp.dest(paths.dist.styles));
            });
    });
    
    /* =================================
    Custom Build
    ================================= */
    gulp.task('custom', function () {
        var modules = process.argv.slice(3);
        modules = modules.toString();
        if (modules === '') {
            modules = [];
        }
        else {
            modules = modules.substring(1).replace(/ /g, '').replace(/,,/g, ',');
            modules = modules.split(',');
        }
        var modulesJsList = [], modulesLessList = [];
        var i, module;
        modulesJsList.push.apply(modulesJsList, f7.modules.core_intro.js);
        modulesLessList.push.apply(modulesLessList, f7.modules.core_intro.less);
        for (i = 0; i < modules.length; i++) {
            module = f7.modules[modules[i]];
            if (module.dependencies.length > 0) {
                modules.push.apply(modules, module.dependencies);
            }
        }
        for (i = 0; i < modules.length; i++) {
            module = f7.modules[modules[i]];
            if (!(module)) continue;

            if (module.js.length > 0) {
                modulesJsList.push.apply(modulesJsList, module.js);
            }
            if (module.less.length > 0) {
                modulesLessList.push.apply(modulesLessList, module.less);
            }
        }
        modulesJsList.push.apply(modulesJsList, f7.modules.core_outro.js);
        modulesLessList.push.apply(modulesLessList, f7.modules.core_outro.less);

        // Unique
        var customJsList = [];
        var customLessList = [];
        for (i = 0; i < modulesJsList.length; i++) {
            if (customJsList.indexOf(modulesJsList[i]) < 0) customJsList.push(modulesJsList[i]);
        }
        for (i = 0; i < modulesLessList.length; i++) {
            if (customLessList.indexOf(modulesLessList[i]) < 0) customLessList.push(modulesLessList[i]);
        }

        gulp.src(customJsList)
            .pipe(tap(function (file, t){
                addJSIndent (file, t);
            }))
            .pipe(concat(f7.filename + '.custom.js'))
            .pipe(header(f7.customBanner, { pkg : f7.pkg, date: f7.date, modulesList: modules.join(',') } ))
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(gulp.dest(paths.custom.scripts))

            .pipe(uglify())
            .pipe(header(f7.customBanner, { pkg : f7.pkg, date: f7.date, modulesList: modules.join(',') }))
            .pipe(rename(function(path) {
                path.basename = path.basename + '.min';
            }))
            .pipe(gulp.dest(paths.custom.scripts));

        gulp.src(customLessList)
            .pipe(concat(f7.filename + '.custom.less'))
            .pipe(less({
                paths: [ path.join(__dirname, 'less', 'includes') ]
            }))
            .pipe(header(f7.customBanner, { pkg : f7.pkg, date: f7.date, modulesList: modules.join(',') } ))
            .pipe(gulp.dest(paths.custom.styles))

            .pipe(minifyCSS())
            .pipe(header(f7.customBanner, { pkg : f7.pkg, date: f7.date, modulesList: modules.join(',') }))
            .pipe(rename(function(path) {
                path.basename = path.basename + '.min';
            }))
            .pipe(gulp.dest(paths.custom.styles));
    });
    /* =================================
    Watch
    ================================= */
    gulp.task('watch', function () {
        // F7 styles and scripts
        gulp.watch(paths.source.scripts, [ 'scripts' ]);
        gulp.watch(paths.source.styles + '*.less', [ 'styles' ]);
        // Demo App
        gulp.watch([paths.source.root + 'templates/*.jade', paths.source.root + 'my-app/*.*', paths.source.root + 'img/*.*'], ['demo-app']);
        // KS
        gulp.watch(paths.ks.less, [ 'ks-less' ]);
        gulp.watch(paths.ks.jade, [ 'ks-jade' ]);
        gulp.watch(paths.ks.root + 'js/*.js', function () {
            gulp.src(paths.ks.root)
                .pipe(connect.reload());
        });
        // Examples
        var i;
        for (i = 0; i < paths.examples.list.length; i++) {
            var exampleRoot = paths.examples.root + paths.examples.list[i] + '/';
            gulp.watch([exampleRoot + 'jade/*.jade', exampleRoot + 'less/*.less'], [ 'examples' ], function () {
                gulp.src([exampleRoot + 'jade/*.jade', exampleRoot + 'less/*.less'])
                    .pipe(connect.reload());
            });
        }
        // Apps
        for (i = 0; i < paths.apps.list.length; i++) {
            var appRoot = paths.apps.root + paths.apps.list[i] + '/';
            gulp.watch([appRoot + 'jade/*.jade', appRoot + 'less/*.less'], [ 'apps' ], function () {
                gulp.src([appRoot + 'jade/*.jade', appRoot + 'less/*.less'])
                    .pipe(connect.reload());
            });
        }
    });

    gulp.task('connect', function () {
        return connect.server({
            root: [ paths.root ],
            livereload: true,
            port:'3000'
        });
    });
    
    gulp.task('open', function () {
        return gulp.src(paths.ks.root + 'index.html').pipe(open('', { url: 'http://localhost:3000/' + paths.ks.root + 'index.html'}));
    });

    gulp.task('server', [ 'watch', 'connect', 'open' ]);

    gulp.task('default', [ 'server' ]);
    
    gulp.task('test', [ 'build' ]);
})();
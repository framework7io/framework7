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
                ios : {
                    root: 'kitchen-sink-ios/',
                    css: 'kitchen-sink-ios/css/',
                    jade: 'kitchen-sink-ios/jade/*.jade',
                    less: 'kitchen-sink-ios/less/*.less',
                },
                material : {
                    root: 'kitchen-sink-material/',
                    css: 'kitchen-sink-material/css/',
                    jade: 'kitchen-sink-material/jade/*.jade',
                    less: 'kitchen-sink-material/less/*.less',
                }
            },
            source: {
                root: 'src/',
                styles: {
                    ios: 'src/less/ios/',
                    material: 'src/less/material/'
                },
                scripts: 'src/js/*.js'
            },
            examples: {
                root: 'examples/',
                list: ['inline-pages', 'split-view', 'split-view-panel', 'tab-bar', 'template7-pages']
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
                'src/js/progressbar.js',
                'src/js/panels.js',
                'src/js/lazy-load.js',
                'src/js/material-preloader.js',
                'src/js/messages.js',
                'src/js/swipeout.js',
                'src/js/sortable.js',
                'src/js/smart-select.js',
                'src/js/virtual-list.js',
                'src/js/pull-to-refresh.js',
                'src/js/infinite-scroll.js',
                'src/js/scroll-toolbars.js',
                'src/js/material-tabbar.js',
                'src/js/tabs.js',
                'src/js/accordion.js',
                'src/js/fast-clicks.js',
                'src/js/clicks.js',
                'src/js/resize.js',
                'src/js/forms-storage.js',
                'src/js/forms-ajax.js',
                'src/js/forms-textarea.js',
                'src/js/material-inputs.js',
                'src/js/push-state.js',
                'src/js/swiper-init.js',
                'src/js/photo-browser.js',
                'src/js/autocomplete.js',
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
                '<% if(typeof(theme) !== "undefined") {%> * \n * <%= theme %>\n *<% } else { %> * <% } %>',
                // ' * ',
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
                    scriptFilename: 'framework7',
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
    Dist Version
    ================================= */
    gulp.task('dist', function () {
        gulp.src([paths.build.root + '**/*.*'])
            .pipe(gulp.dest(paths.dist.root))
            .on('end', function () {
                // Jade
                gulp.src(paths.source.root + 'templates/*.jade')
                    .pipe(jade({
                        pretty: true,
                        locals: {
                            stylesheetFilename: 'framework7.ios.min',
                            stylesheetColorsFilename: 'framework7.ios.colors.min',
                            scriptFilename: 'framework7.min',
                        }
                    }))
                    .pipe(gulp.dest(paths.dist.root));
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
                    paths.dist.styles + f7.filename + '.ios.css', 
                    paths.dist.styles + f7.filename + '.ios.rtl.css', 
                    paths.dist.styles + f7.filename + '.ios.colors.css',
                    paths.dist.styles + f7.filename + '.material.css', 
                    paths.dist.styles + f7.filename + '.material.rtl.css', 
                    paths.dist.styles + f7.filename + '.material.colors.css'
                ];
                gulp.src(minifiedCSS)
                    .pipe(minifyCSS({
                        advanced: false,
                        aggressiveMerging: false,
                    }))
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
        var modulesJs = [], modulesLessIOS = [], modulesLessMaterial = [];
        var i, module;
        modulesJs.push.apply(modulesJs, f7.modules.core_intro.js);
        modulesLessIOS.push.apply(modulesLessIOS, f7.modules.core_intro.less.ios);
        modulesLessMaterial.push.apply(modulesLessMaterial, f7.modules.core_intro.less.material);
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
                modulesJs.push.apply(modulesJs, module.js);
            }
            if (module.less.ios && module.less.ios.length > 0) {
                modulesLessIOS.push.apply(modulesLessIOS, module.less.ios);
            }
            if (module.less.material && module.less.material.length > 0) {
                modulesLessMaterial.push.apply(modulesLessMaterial, module.less.material);
            }
        }
        modulesJs.push.apply(modulesJs, f7.modules.core_outro.js);
        modulesLessIOS.push.apply(modulesLessIOS, f7.modules.core_outro.less.ios);
        modulesLessMaterial.push.apply(modulesLessMaterial, f7.modules.core_outro.less.material);

        // Unique
        var customJsList = [];
        var customLessIOS = [];
        var customLessMaterial = [];
        for (i = 0; i < modulesJs.length; i++) {
            if (customJsList.indexOf(modulesJs[i]) < 0) customJsList.push(modulesJs[i]);
        }
        for (i = 0; i < modulesLessIOS.length; i++) {
            if (customLessIOS.indexOf(modulesLessIOS[i]) < 0) customLessIOS.push(modulesLessIOS[i]);
        }
        for (i = 0; i < modulesLessMaterial.length; i++) {
            if (customLessMaterial.indexOf(modulesLessMaterial[i]) < 0) customLessMaterial.push(modulesLessMaterial[i]);
        }

        // JS
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
        
        // CSSes
        [customLessIOS, customLessMaterial].forEach(function (customLessList) {
            var theme = customLessList === customLessIOS ? 'ios' : 'material';
            var themeName = theme === 'ios' ? 'iOS Theme' : 'Google Material Theme';
            gulp.src(customLessList)
                .pipe(concat(f7.filename + '.' + theme + '.custom.less'))
                .pipe(less({
                    paths: [ path.join(__dirname, 'less', 'includes') ]
                }))
                .pipe(header(f7.customBanner, { pkg : f7.pkg, date: f7.date, theme: themeName, modulesList: modules.join(',') } ))
                .pipe(gulp.dest(paths.custom.styles))

                .pipe(minifyCSS({
                    advanced: false,
                    aggressiveMerging: false,
                }))
                .pipe(header(f7.customBanner, { pkg : f7.pkg, date: f7.date, theme: themeName, modulesList: modules.join(',') }))
                .pipe(rename(function(path) {
                    path.basename = path.basename + '.min';
                }))
                .pipe(gulp.dest(paths.custom.styles));
        });
    });
    /* =================================
    Watch
    ================================= */
    gulp.task('watch', function () {
        // F7 styles and scripts
        gulp.watch(paths.source.scripts, [ 'scripts' ]);
        gulp.watch(paths.source.styles.ios + '*.less', [ 'styles-ios' ]);
        gulp.watch(paths.source.styles.material + '*.less', [ 'styles-material' ]);

        // Demo App
        gulp.watch([paths.source.root + 'templates/*.jade', paths.source.root + 'my-app/*.*', paths.source.root + 'img/*.*'], ['demo-app']);

        // KS
        gulp.watch(paths.ks.ios.less, [ 'ks-ios-less' ]);
        gulp.watch(paths.ks.ios.jade, [ 'ks-ios-jade' ]);
        gulp.watch(paths.ks.ios.root + 'js/*.js', function () {
            gulp.src(paths.ks.ios.root)
                .pipe(connect.reload());
        });
        // KS Material
        gulp.watch(paths.ks.material.less, [ 'ks-material-less' ]);
        gulp.watch(paths.ks.material.jade, [ 'ks-material-jade' ]);
        gulp.watch(paths.ks.material.root + 'js/*.js', function () {
            gulp.src(paths.ks.material.root)
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
    });

    gulp.task('connect', function () {
        return connect.server({
            root: [ paths.root ],
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
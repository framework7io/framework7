'use strict';
/*global require:true, module:false*/
module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var framework7 = {
        filename: 'framework7'
    };

    // Project configuration.
    grunt.initConfig({
        framework7: framework7,
        // Metadata.
        pkg: grunt.file.readJSON('bower.json'),
        banner: '/*\n' +
            ' * <%= pkg.name %> <%= pkg.version %>\n' +
            ' * <%= pkg.description %>\n' +
            ' *\n' +
            ' * <%= pkg.homepage %>\n' +
            ' *\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author %>\n' +
            ' * The iDangero.us\n' +
            ' * http://www.idangero.us/\n' +
            ' *\n' +
            ' * Licensed under <%= pkg.license.join(" & ") %>\n' +
            ' *\n' +
            ' * Released on: <%= grunt.template.today("mmmm d, yyyy") %>\n' +
            '*/\n',

        // Task configuration.
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: ''
                }
            }
        },
        open: {
            kitchen: {
                path: 'http://localhost:3000/kitchen-sink'
            }
        },
        less: {
            build: {
                options: {
                    paths: ['less'],
                    cleancss: false
                },
                files: {
                    'build/css/framework7.css' : ['src/less/framework7.less']
                }
            },
            dist: {
                options: {
                    paths: ['less'],
                    cleancss: true
                },
                files: {
                    'dist/css/framework7.min.css' : ['src/less/framework7.less']
                }
            },
            build_rails: {
                options: {
                    paths: ['less'],
                    cleancss: false,
                    modifyVars: {
                        imgBaseUrl: '"../assets"'
                    }
                },
                files: {
                    'build_rails/stylesheets/framework7.css' : ['src/less/framework7.less']
                }
            },
            dist_rails: {
                options: {
                    paths: ['less'],
                    cleancss: true,
                    modifyVars: {
                        imgBaseUrl: '"../assets"'
                    }
                },
                files: {
                    'dist_rails/stylesheets/framework7.min.css' : ['src/less/framework7.less']
                }
            },
            kitchen: {
                options: {
                    paths: ['kitchen-sink/less/'],
                    cleancss: false
                },
                files: {
                    'kitchen-sink/css/kitchen-sink.css' : 'kitchen-sink/less/kitchen-sink.less'
                }
            },
            examples: {
                options: {
                    cleancss: false
                },
                files: [
                    {
                        expand: true,
                        cwd: 'examples/tab-bar/less/',
                        src: ['*.less'],
                        dest: 'examples/tab-bar/css/',
                        ext: '.css'
                    },
                    {
                        expand: true,
                        cwd: 'examples/split-view/less/',
                        src: ['*.less'],
                        dest: 'examples/split-view/css/',
                        ext: '.css'
                    },
                    {
                        expand: true,
                        cwd: 'examples/split-view-panel/less/',
                        src: ['*.less'],
                        dest: 'examples/split-view-panel/css/',
                        ext: '.css'
                    }
                ]
            },
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: false,
                process: function (src, filename) {
                    if (filename.indexOf('.js') >= 0) {
                        var addIndent = '        ';
                        filename = filename.replace('src/js/', '');
                        if (filename === 'wrap-start.js' || filename === 'wrap-end.js') {
                            addIndent = '';
                        }
                        if (filename === 'f7-intro.js' || filename === 'f7-outro.js' || filename === 'dom.js') addIndent = '    ';
                        src = grunt.util.normalizelf(src);
                        return src.split(grunt.util.linefeed).map(function (line) {
                            return addIndent + line;
                        }).join(grunt.util.linefeed);
                    }
                    else return src;
                }
            },
            js: {
                src: [
                    'src/js/wrap-start.js',
                    'src/js/f7-intro.js',
                    'src/js/views.js',
                    'src/js/navbars.js',
                    'src/js/xhr.js',
                    'src/js/pages.js',
                    'src/js/modals.js',
                    'src/js/panels.js',
                    'src/js/messages.js',
                    'src/js/swipeout.js',
                    'src/js/smart-select.js',
                    'src/js/pull-to-refresh.js',
                    'src/js/fast-clicks.js',
                    'src/js/clicks.js',
                    'src/js/resize.js',
                    'src/js/device.js',
                    'src/js/forms-handler.js',
                    'src/js/init.js',
                    'src/js/f7-outro.js',
                    'src/js/dom.js',
                    'src/js/wrap-end.js'
                ],
                dest: 'build/js/<%= framework7.filename %>.js'
            },
            css_build: {
                src: ['build/css/<%= framework7.filename %>.css'],
                dest: 'build/css/<%= framework7.filename %>.css'
            },
            css_dist: {
                src: ['dist/css/<%= framework7.filename %>.min.css'],
                dest: 'dist/css/<%= framework7.filename %>.min.css'
            },
            js_rails: {
                src: [
                    'src/js/wrap-start.js',
                    'src/js/f7-intro.js',
                    'src/js/views.js',
                    'src/js/navbars.js',
                    'src/js/xhr.js',
                    'src/js/pages.js',
                    'src/js/modals.js',
                    'src/js/panels.js',
                    'src/js/messages.js',
                    'src/js/swipeout.js',
                    'src/js/smart-select.js',
                    'src/js/pull-to-refresh.js',
                    'src/js/fast-clicks.js',
                    'src/js/clicks.js',
                    'src/js/resize.js',
                    'src/js/device.js',
                    'src/js/forms-handler.js',
                    'src/js/init.js',
                    'src/js/f7-outro.js',
                    'src/js/dom.js',
                    'src/js/wrap-end.js'
                ],
                dest: 'build_rails/javascripts/<%= framework7.filename %>.js'
            },
            css_build_rails: {
                src: ['build_rails/stylesheets/<%= framework7.filename %>.css'],
                dest: 'build_rails/stylesheets/<%= framework7.filename %>.css'
            },
            css_dist_rails: {
                src: ['dist_rails/stylesheets/<%= framework7.filename %>.min.css'],
                dest: 'dist_rails/stylesheets/<%= framework7.filename %>.min.css'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: ['dist/js/<%= framework7.filename %>.js'],
                dest: 'dist/js/<%= framework7.filename %>.min.js',
            },
            rails: {
                src: ['dist_rails/javascripts/<%= framework7.filename %>.js'],
                dest: 'dist_rails/javascripts/<%= framework7.filename %>.min.js',
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: ['Gruntfile.js', 'build/js/framework7.js']
            }
        },
        jshint_rails: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: ['Gruntfile.js', 'build_rails/javascripts/framework7.js']
            }
        },
        watch: {
            build: {
                files: ['src/**'],
                tasks: ['build'],
                options: {
                    livereload: true
                }
            },
            kitchen: {
                files: ['kitchen-sink/jade/**', 'kitchen-sink/less/**'],
                tasks: ['jade:kitchen', 'less:kitchen'],
                options: {
                    livereload: true
                }
            },
            examples: {
                files: [
                    'examples/tab-bar/jade/**', 'examples/tab-bar/less/**',
                    'examples/split-view/jade/**', 'examples/split-view/less/**',
                    'examples/split-view-panel/jade/**', 'examples/split-view-panel/less/**'
                ],
                tasks: ['jade:examples', 'less:examples'],
                options: {
                    livereload: true
                }
            }
        },
        jade: {
            build: {
                options: {
                    pretty: true,
                    data: function () {
                        return {
                            cssDir: 'css',
                            jsDir: 'js',
                            imgDir: 'img'
                        };
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src/templates/',
                    src: ['*.jade'],
                    dest: 'build/',
                    ext: '.html'
                }]
            },
            build_rails: {
                options: {
                    pretty: true,
                    data: function () {
                        return {
                            cssDir: 'stylesheets',
                            jsDir: 'javascripts',
                            imgDir: 'images'
                        };
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src/templates/',
                    src: ['*.jade'],
                    dest: 'build_rails/',
                    ext: '.html'
                }]
            },
            kitchen: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'kitchen-sink/jade/',
                    src: ['*.jade'],
                    dest: 'kitchen-sink/',
                    ext: '.html'
                }]
            },
            examples: {
                options: {
                    pretty: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'examples/tab-bar/jade/',
                        src: ['*.jade'],
                        dest: 'examples/tab-bar/',
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: 'examples/split-view/jade/',
                        src: ['*.jade'],
                        dest: 'examples/split-view/',
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: 'examples/split-view-panel/jade/',
                        src: ['*.jade'],
                        dest: 'examples/split-view-panel/',
                        ext: '.html'
                    },
                    
                ]
            }
        },
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['img/**'],
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        cwd: 'src/my-app/',
                        src: ['my-app.css'],
                        dest: 'build/css/'
                    },
                    {
                        expand: true,
                        cwd: 'src/my-app/',
                        src: ['my-app.js'],
                        dest: 'build/js/'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['**'],
                        dest: 'dist/'
                    }
                ]
            },
            build_rails: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/img',
                        src: ['**'],
                        dest: 'build_rails/images'
                    },
                    {
                        expand: true,
                        cwd: 'src/my-app/',
                        src: ['my-app.css'],
                        dest: 'build_rails/stylesheets/'
                    },
                    {
                        expand: true,
                        cwd: 'src/my-app/',
                        src: ['my-app.js'],
                        dest: 'build_rails/javascripts/'
                    }
                ]
            },
            dist_rails: {
                files: [
                    {
                        expand: true,
                        cwd: 'build_rails/',
                        src: ['**'],
                        dest: 'dist_rails/'
                    }
                ]
            }
        },
    });

    // Default task.
    this.registerTask('default', ['build']);

    // Build a new version of the library
    this.registerTask('test', 'Test of <%= pkg.name %>', [
        'concat:js',
        'less:build',
        'concat:css_build',
        'jshint',
    ]);

    // Build a new version of the library
    this.registerTask('build', 'Builds a development version of <%= pkg.name %>', [
        'concat:js',
        'less:build',
        'concat:css_build',
        'jshint',
        'copy:build',
        'jade:build',
    ]);

    // Release
    this.registerTask('dist', 'Builds a distributable version of <%= pkg.name %>', [
        'concat:js',
        'less:build',
        'less:dist',
        'concat:css_build',
        'concat:css_dist',
        'jshint',
        'copy:build',
        'jade:build',
        'copy:dist',
        'uglify:dist'
    ]);

    // Build a new rails asset pipeline compatible version of the library
    this.registerTask('rails', 'Builds a rails version of <%= pkg.name %>', [
        'concat:js_rails',
        'less:build_rails',
        'less:dist_rails',
        'concat:css_build_rails',
        'concat:css_dist_rails',
        'copy:build_rails',
        'jade:build_rails',
        'copy:dist_rails',
        'uglify:rails'
    ]);

    // Kitchen Sink
    this.registerTask('kitchen', 'Builds a kithcen sink', [
        'build',
        'jade:kitchen',
        'less:kitchen'
    ]);
    this.registerTask('examples', 'Compile examples less and jade files', [
        'jade:examples',
        'less:examples'
    ]);

    // Server
    this.registerTask('server', 'Run server', [
        'connect',
        'open',
        'watch'
    ]);

};

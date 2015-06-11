module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);



    // Project configuration.
    grunt.initConfig({
        // Project settings
        music: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['app/scripts/*.js', 'app/scripts/controller/*.js', 'app/scripts/services/*.js']
        },
        watch: {
            options: {
                livereload: true
            },
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            views: {
                files: 'app/views/**/*.html'
            },
            js: {
                files: 'app/scripts/**/*.js'
            },

            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    'app/{,**/}*.html',
                    'app/{,**/}*.js',
                    'app/{,**/}*.css',
                    'app/{,**/}*.md'
                ]
            }
        },
        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= music.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= music.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= music.dist %>'
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['.tmp', '<%= music.dist %>/*', '!<%= music.dist %>/.git*']
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/test/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        bowerInstall: {
            app: {
                src: ['<%= music.app %>/index.html'],
                ignorePath: '<%= music.app %>/',
                exclude: ['bootstrap.css']
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: ['<%= music.dist %>/scripts/{,*/}*.js', '<%= music.dist %>/styles/{,*/}*.css',
                        '<%= music.dist %>/styles/fonts/*']
                }
            }
        },

        useminPrepare: {
            html: '<%= music.app %>/index.html',
            options: {
                dest: '<%= music.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= music.dist %>/{,*/}*.html', '<%= music.dist %>/views/{,*/}*.html'],
            css: ['<%= music.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= music.dist %>']
            }
        },



        // The following *-min tasks produce minified files in the dist folder
        cssmin: {
            options: {
                root: '<%= music.app %>'
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= music.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= music.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= music.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= music.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= music.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= music.dist %>'
                }]
            }
        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= music.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= music.app %>',
                    dest: '<%= music.dist %>',
                    src: ['*.{ico,png,txt}', '.htaccess', '*.html', 'views/{,*/}*.html', 'images/{,*/}*.{webp,pdf}', 'views/**']
                },
                {
                    expand: true,
                    cwd: '<%= music.app %>/bower_components/font-awesome',
                    dest: '<%= music.dist %>',
                    src: ['fonts/*']
                },
                {
                    expand: true,
                    cwd: '<%= music.app %>/store',
                    dest: '<%= music.dist %>/store',
                    src: ['*']
                },
                {
                    expand: true,
                    cwd: '<%= music.app %>/scripts',
                    dest: '<%= music.dist %>/scripts',
                    src: ['inc/**']
                },
                {
                    expand: true,
                    cwd: '<%= music.app %>/scripts',
                    dest: '<%= music.dist %>/scripts',
                    src: ['sysconfig/*']
                },
                {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= music.dist %>/images',
                    src: ['generated/*']
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= music.app %>/styles',
                dest: '.tmp/styles/test',
                src: 'main.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: ['copy:styles'],
            test: ['copy:styles'],
            dist: ['copy:styles', 'imagemin', 'svgmin']
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'watch']);

    grunt.registerTask('build', [
        'clean:dist',
        'bowerInstall',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'htmlmin'
    ]);


    grunt.registerTask('mizi', ['jshint', 'watch:livereload']);

};

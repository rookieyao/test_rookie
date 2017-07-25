/* eslint-env node */

module.exports = function (grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);

    var appConfig = {
        app: 'app',
        dist: 'dist'
    };

    var pkg = grunt.file.readJSON('package.json'),
        // 公共依赖集合
        publicDependencies = [],
        // 私有依赖集合
        sxylibDependencies = [],
        // 全部依赖集合
        allDependencies = [],
        // sxylib库中的全部框架集合
        sxyLiberaries = ['metronic', 'ui-grid', 'google_font', 'generator-webcommon', 'webcommon'],
        sxyGenrator = 'generator-webcommon',
        sxyFrameworks = ['metronic', 'ui-grid', 'google_font', 'webcommon'];

    function deptInLiberary (name) {
        for (var i = 0, len = sxyLiberaries.length; i < len; i++) {
            if (sxyLiberaries[i] === name) {
                return true;
            }
        }
        return false;
    }

    for (var key in pkg.depdenencies) {
        if (deptInLiberary(key)) {
            sxylibDependencies.push(key);
        } else {
            publicDependencies.push(key);
        }
        allDependencies.push(key);
    }
    for (var key in pkg.devDependencies) {
        if (deptInLiberary(key)) {
            sxylibDependencies.push(key);
        } else {
            publicDependencies.push(key);
        }
        allDependencies.push(key);
    }

    grunt.initConfig({
        yeoman: appConfig,
        connect: {
            options: {
                port: 3000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect().use('/node_modules', connect.static('./node_modules')),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep:serve']
            },
            js: {
                files: ['<%= yeoman.app %>/scripts/**/*.js'],
                tasks: ['newer:eslint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            gruntfile: {
                files: ['_Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/**/*.html',
                    '.tmp/styles/**/*.css',
                    '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: './bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    sassDir: ['.tmp/styles'],
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        eslint: {
            all: [
                '<%= yeoman.app %>/scripts/**/*.js',
                'test/spec/**/*.js',
                '_Gruntfile.js'
            ],
            test: [
                'test/spec/**/*.js'
            ]
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/**/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '**/*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/build.js'
            }
        },

        wiredep: {
            serve: {
                src: ['<%= yeoman.app %>/styles/main.scss'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            },
            dist: {
                src: ['.tmp/styles/main.scss'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            },
            options: {
                fileTypes: {
                    scss: {
                        replace: {
                            css: '@import \'{{filePath}}\';',
                            sass: '@import \'{{filePath}}\';',
                            scss: '@import \'{{filePath}}\';'
                        }
                    }
                }
            }
        },

        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/styles/**/*.css',
                    '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/styles/fonts/*',
                    '<%= yeoman.dist %>/views/**/*.html',
                    '<%= yeoman.dist %>/scripts/**/*.js',
                    '<%= yeoman.dist %>/bower_components/**/*.js',
                    '!<%= yeoman.dist %>/images/static/*.jpg'
                ]
            },
            paths: {
                src: ['<%= yeoman.dist %>/scripts/paths.js']
            }
        },

        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
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

        usemin: {
            html: ['<%= yeoman.dist %>/**/*.html'],
            css: ['<%= yeoman.dist %>/styles/**/*.css'],
            imagesAndViews: ['<%= yeoman.dist %>/scripts/**/*.js', '<%= yeoman.dist %>/views/**/*.html'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images'],
                patterns: {
                    imagesAndViews: [
                        [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp))/gm, 'Update the JS to reference our revved images'],
                        [/(views\/.*?\.(?:html))/gm, 'Update the JS to reference our revved html views']
                    ]
                }
            }
        },

        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/bower_components',
                    src: '**/*.js',
                    dest: '<%= yeoman.dist %>/bower_components'
                }, {
                    expand: true,
                    cwd: '<%= yeoman.dist %>/scripts',
                    src: '**/*.js',
                    dest: '<%= yeoman.dist %>/scripts'
                }]
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '**/*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '**/*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'views/**/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    src: ['**/*.js'],
                    dest: '.tmp/scripts'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            styles: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/styles',
                    src: ['**/*.scss'],
                    dest: '.tmp/styles'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'views/**/*.html',
                        'images/**/*.{webp}',
                        'fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: '.',
                    src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
                    dest: '<%= yeoman.dist %>'
                }, {
                    expand: true,
                    cwd: '.',
                    src: 'bower_components/requirejs/require.js',
                    dest: '<%= yeoman.dist %>'
                }]
            },
            prod: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    dest: '<%= yeoman.dist %>/scripts',
                    src: 'http/**'
                }]
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: 'bower_components/**',
                    dest: '<%= yeoman.dist %>'
                },{
                    expand: true,
                    cwd: '.tmp/styles',
                    src: 'main.css',
                    dest: '<%= yeoman.dist %>/styles'
                },{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'views/**',
                        'images/**',
                        'fonts/*',
                        'scripts/**'
                    ]
                }]
            },
            dept: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: 'node_modules/webcommon/**',
                    dest: '<%= yeoman.dist %>'
                }, {
                    expand: true,
                    cwd: '.',
                    src: 'node_modules/metronic/**',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist',
                'imagemin',
                'svgmin'
            ]
        },

        requirejs: {
            compile: {
                options: {
                    mainConfigFile: '.tmp/scripts/build.js',
                    baseUrl: '.tmp/scripts',
                    uglify2: {
                        mangle: false
                    },
                    removeCombined: true,
                    preserveLicenseComments: false,
                    findNestedDependencies: true,
                    dir: 'dist/scripts',
                    modules: [
                        {
                            name: 'build'
                        }
                    ],
                    optimize: 'uglify2',
                    paths: {
                        'crypto-js': 'empty:'
                    }
                }
            }
        },

        jsrev: {
            dist: {
                options: {
                    baseRoot: '<%= yeoman.dist %>/scripts',
                    baseUrl: 'scripts',
                    outputFile: '<%= yeoman.dist %>/scripts/paths.js'
                }
            }
        },

        shell: {
            options: {
                stderr: true,
                stdout: true,
                stdin: true,
                failOnError: false,
                stdinRawMode: true,
                preferLocal: true
            },
            uninstall: {
                command: [
                    'npm uninstall ' + sxyFrameworks.join(' '),
                    'npm uninstall -g ' + sxyFrameworks.join(' ')
                ].join('&&'),
                options: {
                    callback: function (err, stdout, stderr, cb) {
                        if (err) {
                            cb(err);
                            return;
                        }

                        grunt.log.writeln(stdout);
                        grunt.log.writeln('Finish remove all liberaries from sxylib...');

                        cb();
                    }
                }
            },
            clean: {
                command: 'npm cache clean',
                options: {
                    callback: function (err, stdout, stderr, cb) {
                        if (err) {
                            cb(err);
                            return;
                        }

                        grunt.log.writeln(stdout);
                        grunt.log.writeln('Finish clean caches...');

                        cb();
                    }
                }
            },
            yo: {
                command: 'npm install yeoman-generator',
                options: {
                    callback: function (err, stdout, stderr, cb) {
                        if (err) {
                            cb(err);
                            return;
                        }

                        grunt.log.writeln(stdout);
                        grunt.log.writeln('Finish install a yeoman generator...');

                        cb();
                    }
                }
            },
            isarray: {
                command: 'npm install isarray@0.0.1 --force',
            },
            samsam: {
                command: 'npm install samsam@1.1.2 --force',
            },
            underscore: {
                command: 'npm install underscore.string@3.3.4 --force',
            },
            through2: {
                command: 'npm install through2-filter --force',
            },
            stripIndent: {
                command: 'npm install strip-indent@1.0.1 --force',
            },
            bufferCrc: {
                command: 'npm install buffer-crc32@0.2.13 --force',
            },
            ware: {
                command: 'npm install ware@1.3.0 --force',
            },
            decompressUnzip: {
                command: 'npm install decompress-unzip@3.4.0 --force',
            },
            statMode: {
                command: 'npm install stat-mode@0.2.2 --force',
            },
            domutils: {
                command: 'npm install domutils@1.4.3 --force',
            },
            filenamify: {
                command: 'npm install filenamify@1.2.1 --force',
            },
            sparkles: {
                command: 'npm install sparkles@1.0.0 --force',
            },
            installPublic: {
                command: 'npm install ' + publicDependencies.join(' '),
                options: {
                    callback: function (err, stdout, stderr, cb) {
                        if (err) {
                            cb(err);
                            return;
                        }

                        grunt.log.writeln(stdout);
                        grunt.log.writeln('Finish install all public dependencies...');

                        cb();
                    }
                }
            },
            installPrivate: {
                command: 'npm install ' + sxyFrameworks.join(' '),
                options: {
                    callback: function (err, stdout, stderr, cb) {
                        if (err) {
                            cb(err);
                            return;
                        }

                        grunt.log.writeln(stdout);
                        grunt.log.writeln('Finish install liberaries from sxylib...');

                        cb();
                    }
                }
            },
            updateSxyGenerator: {
                command: [
                    'npm uninstall ' + sxyGenrator,
                    'npm uninstall -g ' + sxyGenrator,
                    'npm install ' + sxyGenrator
                ].join('&&'),
                options: {
                    callback: function (err, stdout, stderr, cb) {
                        if (err) {
                            cb(err);
                            return;
                        }

                        grunt.log.writeln(stdout);
                        grunt.log.writeln('Finish update generator-webcommon from sxylib...');

                        cb();
                    }
                }
            },
            npm: {
                command: 'nrm use npm'
            },
            install: {
                command: 'npm install'
            },
            sxylib: {
                command: 'nrm use sxylib'
            }
        }
    });

    function extend (obj1, obj2) {
        for (var key in obj2) {
            !obj1.hasOwnProperty(key) && (obj1[key] = obj2[key]);
        }
    }

    grunt.registerTask('install_public', '', function () {
        grunt.task.run('shell:isarray');
        grunt.task.run('shell:samsam');
        grunt.task.run('shell:underscore');
        grunt.task.run('shell:through2');
        grunt.task.run('shell:stripIndent');
        grunt.task.run('shell:bufferCrc');
        grunt.task.run('shell:ware');
        grunt.task.run('shell:decompressUnzip');
        grunt.task.run('shell:statMode');
        grunt.task.run('shell:domutils');
        grunt.task.run('shell:filenamify');
        grunt.task.run('shell:sparkles');
    });

    grunt.registerTask('rebuild:proj', 'rebuild project configure files...', function () {
        grunt.log.writeln('update finish, rebuild all configure files...');

        var packageFile = grunt.file.readJSON('node_modules/generator-webcommon/app/config/pkg.json'),
            bower = grunt.file.readJSON('bower.json'),
            bowerFile = grunt.file.readJSON('node_modules/generator-webcommon/app/config/_bower.json');

        extend(pkg.dependencies, packageFile.dependencies);
        extend(pkg.devDependencies, packageFile.devDependencies);
        extend(bower.dependencies, bowerFile.dependencies);
        extend(bower.devDependencies, bowerFile.devDependencies);
        for (var key in pkg) {
            packageFile[key] = pkg[key];
        }
        for (var key in bower) {
            bowerFile[key] = bower[key];
        }

        grunt.file.delete('.editorconfig');
        grunt.file.delete('.eslintrc');
        grunt.file.delete('.gitignore');
        grunt.file.delete('bower.json');
        grunt.file.delete('Gruntfile.js');
        grunt.file.delete('package.json');

        grunt.file.copy('node_modules/generator-webcommon/app/config/_editorconfig', '.editorconfig');
        grunt.file.copy('node_modules/generator-webcommon/app/config/_eslintrc', '.eslintrc');
        grunt.file.copy('node_modules/generator-webcommon/app/config/_gitignore', '.gitignore');
        grunt.file.copy('node_modules/generator-webcommon/app/config/_Gruntfile.js', 'Gruntfile.js');

        grunt.file.copy('node_modules/generator-webcommon/app/templates/app/styles/main.scss', 'app/styles/main.scss');
        grunt.file.copy('node_modules/generator-webcommon/app/templates/app/styles/modules/_variables.scss', 'app/styles/modules/_variables.scss');
        grunt.file.copy('node_modules/generator-webcommon/app/templates/app/styles/partials/_home.scss', 'app/styles/partials/_home.scss');

        grunt.file.write('package.json', JSON.stringify(pkg, null, 2));
        grunt.file.write('bower.json', JSON.stringify(bower, null, 2));
    });

    grunt.registerTask('update:proj', 'update framework...', function () {
        grunt.task.run('shell:clean');

        grunt.task.run('shell:npm');

        grunt.task.run('install_public');
        grunt.task.run('shell:yo');

        grunt.task.run('shell:sxylib');

        grunt.task.run('shell:updateSxyGenerator');

        grunt.task.run(['rebuild:proj']);
    });

    grunt.registerTask('update:framework', 'update framework...', function () {
        grunt.task.run('shell:clean');

        grunt.task.run('shell:sxylib');

        grunt.task.run('shell:uninstall');

        grunt.task.run(['shell:installPrivate']);
    });

    grunt.registerTask('update', 'update all...', function () {
        grunt.task.run(['update:proj', 'update:framework']);
    });

    grunt.registerTask('construct', 'install all dependencies...', function () {
        grunt.task.run('shell:npm');

        grunt.task.run('install_public');
        grunt.task.run('shell:yo');

        grunt.task.run('shell:sxylib');

        grunt.task.run(['shell:install']);
    });

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerMultiTask('jsrev', 'Use filerev output to create require-js compatible path mappings', function () {

        if (!grunt.filerev) {
            grunt.fail.warn('Could not find grunt.filerev. Task "filerev" must be run first.');
            return;
        }

        if (!grunt.filerev.summary) {
            grunt.log.warn('No mappings in grunt.filerev.summary. Abort file creation.');
            return;
        }

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            baseRoot: '',
            baseUrl: ''
        });

        if (!options.outputFile) {
            grunt.fail.warn('Option `outputFile` not specified.');
        }

        var templateString = 'var paths = <%= JSON.stringify(moduleMappings, null, 2) %>;';

        var assets = grunt.filerev.summary;
        var path = require('path');
        var mappings = {};

        var removeExtension = function (p) {
            return p.substr(0, p.length - path.extname(p).length);
        };

        for (var longModule in assets) {

            if (assets.hasOwnProperty(longModule)) {
                var longPath = assets[longModule];
                if (path.extname(longPath) !== '.js') {
                    continue;
                }

                var shortPath = path.relative(options.baseRoot, longPath);
                var shortModule = path.relative(options.baseRoot, longModule);

                mappings[removeExtension(shortModule)] = removeExtension(shortPath);
            }
        }

        var data = {
            baseUrl: options.baseUrl,
            moduleMappings: mappings
        };

        var outFile = options.outputFile;


        grunt.task.run('filerev:paths');

        // if the outFile is revved, respect that
        if (assets[outFile]) {
            outFile = assets[outFile];
        }

        var content = grunt.template.process(templateString, {data: data});
        grunt.file.write(options.outputFile, content);
        grunt.log.writeln('File "' + options.outputFile + '" created.');
    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target) {
            return grunt.task.run(['build:' + target, 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'wiredep:serve',
            'concurrent:server',
            'autoprefixer',
            //'bower',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('build:prod', 'Compiles app for production or release candidate', function () {
        grunt.task.run([
            'clean:dist',
            // copy stylesheets, in: app/styles/ out: .tmp/styles
            'copy:styles',
            // Wires in bower dependencies where they belong in: <<>> out: <<>>
            'wiredep:dist',
            // In theory avoids problems related to name mangling by minifiers in: app/scripts out: .tmp/scripts
            'ngAnnotate',
            // Optimizer in: .tmp/scripts out: dist/scripts
            'requirejs',
            // pre-required setup for usemin
            'useminPrepare',
            // compass, imagemin, svgmin
            'concurrent:dist',
            // add css vendor prefixes, in: .tmp/styles out: .tmp/styles
            'autoprefixer',
            // copies non-javascripty things
            'copy:dist',
            // minify css in: <<>> out: <<>>
            'cssmin',
            // adds hash to file names in: <<>> out: <<>>
            'filerev',
            // Creates file map from filerev result in: <<>> out: <<>>
            'jsrev',
            // ???
            'cdnify',
            // minify js in: <<>> out: <<>>
            'uglify',
            // uses filerev data to rewrire file urls
            'usemin',
            // minify html
            'htmlmin',
            'copy:prod',
            'copy:dept'
        ]);
    });

    grunt.registerTask('build:dev', 'Compiles app for production or release candidate', function () {
        grunt.task.run([
            'clean:dist',
            // copy stylesheets, in: app/styles/ out: .tmp/styles
            'copy:styles',
            // Wires in bower dependencies where they belong in: <<>> out: <<>>
            //'wiredep:dist',
            'wiredep:serve',
            'autoprefixer',
            'concurrent:test',
            'copy:dev',
            'copy:dept'
        ]);
    });

    grunt.registerTask('default', [
        'newer:eslint',
        'build'
    ]);
};

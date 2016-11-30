module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            ts: {
                files: 'source/ts/**/**.ts',
                tasks: ['ts:default']
            },
            scss: {
                files: 'source/scss/**/**.scss',
                tasks: ['sass:default']
            }
        },

        ts: {
            default: {
                options: {
                    experimentalDecorators: true,
                    target: 'es6',
                    module: 'commonjs',
                    moduleResolution: "node",
                    sourceMap: true,
                    emitDecoratorMetadata: true,
                    removeComments: false,
                    noImplicitAny: false
                },
                src: ['source/ts/**/**.ts'],
                outDir: 'app/js'
            }
        },

        sass: {
            default: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'source/scss',
                    src: ['**.scss'],
                    dest: 'app/css',
                    ext: '.css'
                }]
            }
        }

    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks("grunt-ts");

    grunt.registerTask('default', ['ts:default','sass:default']);

};

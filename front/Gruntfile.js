module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            ts: {
                files: 'app/ts/source/**/**.ts',
                tasks: ['ts:default']
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
                src: ['app/ts/source/**/**.ts'],
                outDir: 'app/ts'
            }
        }

    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-ts");

};

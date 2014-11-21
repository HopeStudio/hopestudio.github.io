module.exports = function (grunt) {

    // Configurable paths
    var config = {
        css:'css',
        sass:'sass',
        scripts:'scripts'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings

        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            css:{
                files: [
                    '**/*.sass',
                    '**/*.scss'
                ],
                tasks: ['compass']
            },
            js: {
                files: [
                    '<%= config.scripts %>/{,*/}*.js'
                ],
                tasks: ['jshint']
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.scripts %>/{,*/}*.js'
            ]
        },
        compass: {
            dist: {
                options: {
                    sassDir: '<%= config.sass %>',
                    cssDir: '<%= config.css %>',
                    outputStyle: 'compressed'
                }
            }
        }
    });

    // 加载Grunt插件
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // 注册grunt默认任务
    grunt.registerTask('default', ['watch']);
};

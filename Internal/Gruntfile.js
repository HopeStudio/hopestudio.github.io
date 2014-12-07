module.exports = function (grunt) {

    // Configurable paths
    var config = {
        css:'dist/css',
        sass:'src/sass',
		images_dir:'dist/images',
        scripts_src:'src/scripts',
		scripts_dist:'dist/scripts'
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
                  '<%= config.scripts_src %>/{,*/}*.js'
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
                '<%= config.scripts_src %>/{,*/}*.js'
            ]
        },
        compass: {
            dist: {
                options: {
                    sassDir: '<%= config.sass %>',
                    cssDir: '<%= config.css %>',
					imagesDir:'<%= config.images_dir %>',
					relativeAssets:true,
                    outputStyle: 'compressed'
                }
            }
        },
		concat: {  
			options: {  
				separator: ';' //separates scripts  
			},
			dist: {  
				src: ['<%= config.scripts_src %>/*.js', '<%= config.scripts_src %>/**/*.js'], //Grunt mini match for your scripts to concatenate  
				dest: '<%= config.scripts_dist %>/hope.min.1.js' //where to output the script  
			}  
		},  
		uglify:{
			js: {  
			    files: {  
					'<%= config.scripts_dist %>/hope.min.1.js': ['<%= config.scripts_dist %>/hope.min.1.js'] //save over the newly created script  
				}  
			}
		}
    });

    // 加载Grunt插件
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');  
	grunt.loadNpmTasks('grunt-contrib-uglify'); 

    // 注册grunt默认任务
	grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', [/**'jshint',**/'concat','uglify']);
};

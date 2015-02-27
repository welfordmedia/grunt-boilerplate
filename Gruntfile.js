module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Minify images
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },

        // Concatenate JavaScript files
        concat: {
            dist: {
                src: [
                    'components/jquery/dist/jquery.js',
                    'js/main.js'
                ],
                dest: 'js/build/production.js'
            }
        },

        // Uglify JavaScript files
        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },

        // Compile Sass to CSS
        sass: {
            dist: {
                files: {
                    'css/style.css': 'sass/style.scss'
                }
            }
        },

        // Add vendor prefixes to CSS rules
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({browsers: 'last 2 version'}).postcss,
                    require('csswring').postcss
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },

        // Watch
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass', 'postcss'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');

    // Default task
    grunt.registerTask('default', [
        'imagemin',
        'concat',
        'uglify',
        'sass',
        'postcss',
        'watch'
    ]);
};

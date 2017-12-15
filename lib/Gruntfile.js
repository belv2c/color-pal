module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');


  grunt.initConfig({
    jshint: {
      options: {
        predef: ["document", "console", "firebase", "angular", "app", "$"],
        esnext: true,
        globalstrict: true,
        globals: {}
      },
      files: ['../javascripts/**/*.js']
    },
    sass: {
      dist: {
        files: {
          '../styles/main.css': '../sass/main.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      },
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint']
      }
    },
    clean: {
      options: { force: true },
      public: ['../public']
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: "../",
          src: [
            "index.html",
            "partials/*.html",
            "styles/**/*.css",
            "images/google.png",
            "lib/node_modules/bootstrap/dist/css/bootstrap.min.css",
            "lib/node_modules/angular-xeditable/dist/css/xeditable.min.css",
            "lib/node_modules/angularjs-color-picker/dist/angularjs-color-picker.min.css",
            "lib/node_modules/angularjs-color-picker/dist/themes/angularjs-color-picker-bootstrap.min.css",
            "lib/node_modules/jquery/dist/jquery.min.js",
            "lib/node_modules/bootstrap/dist/js/bootstrap.min.js",
            "lib/node_modules/angular/angular.min.js",
            "lib/node_modules/angular-route/angular-route.min.js",
            "lib/node_modules/angular-animate/angular-animate.min.js",
            "lib/node_modules/angular-sanitize/angular-sanitize.min.js",
            "lib/node_modules/tinycolor2/dist/tinycolor-min.js",
            "lib/node_modules/angularjs-color-picker/dist/angularjs-color-picker.min.js",
            "lib/node_modules/angular-xeditable/dist/js/xeditable.min.js",
            "javascripts/*.js",
            "javascripts/services/*.js",
            "javascripts/controllers/*.js",
            "lib/node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf",
            "lib/node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff",
            "lib/node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2"

          ],
          dest: "../public/"
        }]
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'sass', 'watch']);
  grunt.registerTask('deploy', ['sass', 'copy']);
  grunt.registerTask('cleanit', ['clean']);
};
"use strict";

var _ = require( "underscore" );
var webpack = require( "webpack" );

module.exports = function( grunt ) {
  grunt.initConfig( {
    pkg: grunt.file.readJSON( "package.json" ),
    sass: {
      min: {
        files: {
          "dist/react-datepicker.css": "src/stylesheets/datepicker.scss"
        },
        options: {
          sourcemap: "auto",
          style: "expanded"
        }
      },
      unmin: {
        files: {
          "dist/react-datepicker.min.css": "src/stylesheets/datepicker.scss"
        },
        options: {
          sourcemap: "auto",
          style: "compressed"
        }
      }
    },

    watch: {
      jscs: {
        files: [
          "{src,test}/**/*.{js,jsx}",
          "gruntfile.js",
          "karma.conf.js"
        ],
        tasks: [ "jscs" ]
      },

      css: {
        files: "**/*.scss",
        tasks: [ "sass" ]
      },

      karma: {
        files: [
          "{src,test}/**/*.{js,jsx}"
        ],
        tasks: [ "karma" ]
      },

      webpack: {
        files: [ "src/**/*.js", "src/**/*.jsx" ],
        tasks: [ "webpack" ]
      }
    },

    karma: {
      unit: {
        configFile: "karma.conf.js",
        singleRun: true
      }
    },

    jscs: {
      files: [
        "{src,test}/**/*.{js,jsx}",
        "gruntfile.js",
        "karma.conf.js"
      ],
      options: {
        config: ".jscsrc",
        verbose: true,
        fix: grunt.option( "fix" ) || false
      }
    },

    webpack: {
      unmin: {
        output: {
          filename: "react-datepicker.js"
        }
      },
      min: {
        output: {
          filename: "react-datepicker.min.js"
        },
        plugins: [
          new webpack.optimize.UglifyJsPlugin( {
            compressor: {
              warnings: false
            }
          } )
        ]
      }
    }
  } );

  grunt.loadNpmTasks( "grunt-contrib-sass" );
  grunt.loadNpmTasks( "grunt-contrib-watch" );
  grunt.loadNpmTasks( "grunt-webpack" );
  grunt.loadNpmTasks( "grunt-karma" );
  grunt.loadNpmTasks( "grunt-jscs" );

  grunt.registerTask( "default", [ "watch" ] );
  grunt.registerTask( "travis", [ "jscs", "karma" ] );
  grunt.registerTask( "build", [ "webpack", "sass" ] );
};

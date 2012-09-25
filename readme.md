#Installation
`npm install https://github.com/i-akhmadullin/jet/tarball/master -g`

## Example `Gruntfile.js`
```
module.exports = function( grunt ) {
  'use strict';
  grunt.initConfig({
    styletto: {
      dev: {
        src: [
          '../blocks/_b-reset/b-reset.styl',
          '../lib/**/*.css',
          '../blocks/**/!(!*|*.ie).css',
          '../blocks/**/!(!*|*.ie).styl'
        ],
        dest: '../publish/style.css',
        errors: "alert"
      },
      dev_ie: {
        src: [
          '../blocks/_b-reset/b-reset.ie.styl',
          '../blocks/**/!(!*)*.ie.styl',
          '../blocks/**/!(!*)*.ie.css'
        ],
        dest: '../publish/style.ie.css',
        errors: "alert"
      },
      publish: {
        src: '<config:styletto.dev.src>',
        dest: '../publish/style.min.css',
        compress: true,
        base64: true,
        errors: "error"
      },
      publish_ie: {
        src: '<config:styletto.dev_ie.src>',
        dest: '../publish/style.ie.min.css',
        compress: true,
        base64: true,
        errors: "error"
      }
    },

    watch: {
      scripts: {
        files: '<config:lint.files>',
        tasks: 'concat reload'
      },
      css: {
        files: [
          '../blocks/*.css',
          '../blocks/*.styl',
          '../blocks/**/*.css',
          '../blocks/**/*.styl',
          '../blocks/**/*.less'
        ],
        tasks: 'styletto:dev styletto:dev_ie reload'
      },
      reload: {
        files: [
          '../*.html'//,
          // 'app/styles/**/*.css',
          // 'app/scripts/**/*.js',
          // 'app/images/**/*'
        ],
        tasks: 'reload'
      }
    },
    lint: {
      files: [
        'Gruntfile.js',
        '../lib/**/*.js',
        '../blocks/**/*.js'
      ]
    },
    // specifying JSHint options and globals
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#specifying-jshint-options-and-globals
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },

    // Build configuration
    // -------------------

    // Below, all paths are relative to the staging directory, which is a copy
    // of the app/ directory. Any .gitignore, .ignore and .buildignore file
    // that might appear in the app/ tree are used to ignore these values
    // during the copy process.

    // concat css/**/*.css files, inline @import, output a single minified css
    css: {
      'styles/main.css': ['styles/**/*.css']
    },

    // renames JS/CSS to prepend a hash of their contents for easier
    // versioning
    rev: {
      js: 'scripts/**/*.js',
      css: 'styles/**/*.css',
      img: 'images/**'
    },

    // usemin handler should point to the file containing
    // the usemin blocks to be parsed
    'usemin-handler': {
      html: 'index.html'
    },

    // update references in HTML/CSS to revved files
    usemin: {
      html: ['**/*.html'],
      css: ['**/*.css']
    },

    // Optimizes JPGs and PNGs (with jpegtran & optipng)
    img: {
      dist: '<config:rev.img>'
    },

    // While Yeoman handles concat/min when using
    // usemin blocks, you can still use them manually
    concat: {
      dist: {
        src: ['../lib/**/*.js', '../blocks/**/*.js'],
        dest: '../publish/script.js'
      }
    },
    min: {
      dist: {
        src: '<config:concat.dist.dest>',
        dest: '../publish/script.min.js'
      }
    }
  });

  grunt.registerTask('default', 'concat styletto:dev styletto:dev_ie');
  grunt.registerTask('reloader', 'concat styletto:dev styletto:dev_ie server');
  grunt.registerTask('publish', 'concat lint styletto csslint min');
};
```

##Usage
`cd build`  
`jet reloader`

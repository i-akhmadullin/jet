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
          'blocks/_b-reset/b-reset.styl',
          'lib/**/*.css',
          'blocks/**/!(!*|*.ie).css',
          'blocks/**/!(!*|*.ie|config).styl'
        ],
        dest: 'publish/style.css',
        errors: "alert"
      },
      dev_ie: {
        src: [
          'blocks/_b-reset/b-reset.ie.styl',
          'blocks/**/!(!*)*.ie.styl',
          'blocks/**/!(!*)*.ie.css'
        ],
        dest: 'publish/style.ie.css',
        errors: "alert"
      },
      publish: {
        src: '<config:styletto.dev.src>',
        dest: 'publish/style.min.css',
        compress: true,
        base64: true,
        errors: "error"
      },
      publish_ie: {
        src: '<config:styletto.dev_ie.src>',
        dest: 'publish/style.ie.min.css',
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
          'blocks/**/*.css',
          'blocks/**/*.styl',
          'blocks/**/*.less'
        ],
        tasks: 'styletto:dev styletto:dev_ie reload'
      },
      reload: {
        files: [
          '*.html'
        ],
        tasks: 'reload'
      }
    },
    lint: {
      files: [
        'Gruntfile.js',
        'lib/**/*.js',
        'blocks/**/*.js'
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

    // rev: {
    //   js: 'scripts/**/*.js',
    //   css: 'styles/**/*.css',
    //   img: 'images/**'
    // },

    // Optimizes JPGs and PNGs (with jpegtran & optipng)
    // img: {
    //   dist: '<config:rev.img>'
    // },

    concat: {
      dist: {
        src: ['lib/**/*.js', 'blocks/**/*.js'],
        dest: 'publish/script.js'
      }
    },
    min: {
      dist: {
        src: '<config:concat.dist.dest>',
        dest: 'publish/script.min.js'
      }
    }
  });

  grunt.registerTask('default', 'concat styletto:dev styletto:dev_ie');
  grunt.registerTask('reloader', 'concat styletto:dev styletto:dev_ie server');
  grunt.registerTask('publish', 'concat lint styletto csslint min');
};
```

##Usage
`jet reloader`

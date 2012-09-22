var fs = require('fs'),
  path = require('path'),
  utils = require('../lib/utils');

module.exports = function(grunt) {
  var styletto = require("styletto");

  grunt.registerTask('fetch', 'fetch files', function() {
    // this.target === the name of the target
    // this.data === the target's value in the config object
    // this.name === the task name
    // this.args === an array of args specified after the target on the command-line
    // this.flags === a map of flags specified after the target on the command-line
    // this.file === file-specific .src and .dest properties
    // var files = grunt.file.expandFiles( this.file.src );
    // var options = {
    //   input: files,
    //   output: this.file.dest,
    //   compress: this.data.compress,
    //   base64: this.data.base64,
    //   resolveFrom: this.data.resolveFrom
    // };

    var url = 'http://nodeload.github.com/h5bp/html5-boilerplate/tarball/master';
    grunt.helper('fetch', url);
  });

  // options should have key "input" with list of files to process
  grunt.registerHelper('fetch', function(url) {
    utils.fetch.call(grunt, url, path.join(__dirname, '../'), function(err) {
      if(err) return cb(err);
      cb(null, props);
    });
  });

};
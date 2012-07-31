

var jet = module.exports;

// hoist up any plugins onto the plugin object as lazy-loaded getters.
jet.plugins = require('./lib/plugins');

//
// custom package utilities, works in tandem with `grunt.utils`.
//
// Utils is there to package and provide a
//
// Will be merged into grunt.utils for further usage in tasks and helpers
//
jet.utils = require('./lib/utils');

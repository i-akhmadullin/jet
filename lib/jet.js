#!/usr/bin/env node
var fs = require('fs'),
  join = require('path').join,
  help = 'this is help';
//join(__dirname, 'help.txt')

// grunt with the plugin registered
var grunt = require('grunt');
grunt.loadTasks(join(__dirname, '../node_modules/grunt-css/tasks'));
grunt.loadTasks(join(__dirname, '../node_modules/grunt-styletto/tasks'));

var cli =  require('grunt/lib/grunt/cli');

// command line options and remaining args
var opts = cli.options,
  cmds = cli.tasks,
  route = cmds.join(' ').trim('');

// custom help, on `jet help`
if(/^help/.test(route)) {
  if(/^help$/.test(route)) return fs.createReadStream(help).pipe(process.stdout);
  cli.tasks = cmds.join(':');
}

// add the plugin version on `--version`
if(opts.version) {
  console.log('jet  v%s', require('../package.json').version);
}

// `jet init` -> `grunt init:jet`
if(/^init$/.test(route)) {
  cli.tasks = 'init:jet';
}

// the grunt cli
grunt.cli();

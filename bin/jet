#!/usr/bin/env node
var fs = require('fs'),
  join = require('path').join,
  help = join(__dirname, 'help.txt');

// grunt with the plugin registered
var grunt = require('grunt').npmTasks(join(__dirname, '../'));

// Get back a reference to the internal grunt cli object (Yes, it's hacky) We
// need this to be able to read grunt command line parsed options and tasks to
// run to hook our internal additional logic.
//
// Another (nicer) alternative is to redo the command line parsing with nopt,
// but it'll add yet another dependency for a very little thing
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

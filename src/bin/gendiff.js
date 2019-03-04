#!/usr/bin/env node

const program = require('commander');

program
  .option('-h, --help', 'output usage information')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format');



program.parse(process.argv);

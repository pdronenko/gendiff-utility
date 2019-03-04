#!/usr/bin/env node
const program = require('commander');

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);

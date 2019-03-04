#!/usr/bin/env node
import * as library from '../index';

const program = require('commander');

program
  .option('-h, --help', 'output usage information')
  .description(library.description())
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .command('<firstConfig> <secondConfig>');

program.version('0.0.1');
program.parse(process.argv);

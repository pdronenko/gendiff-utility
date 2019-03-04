#!/usr/bin/env node
import * as library from '../index';

const program = require('commander');

program
  .command('<firstConfig> <secondConfig>')
  .version('0.0.1');
  .option('-h, --help', 'output usage information')
  .description(library.description())
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format');


program.outputHelp();
program.parse(process.argv);

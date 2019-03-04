#!/usr/bin/env node
import * as library from '../index';

const program = require('commander');

program
  .option('-h, --help', 'output usage information')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .command('<firstConfig> <secondConfig>');

program.parse(process.argv);

#!/usr/bin/env node
import * as library from '../index';

const program = require('commander');

program
  .option('-h, --help', 'output usage information')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format');

  program
    .command('')
    .option("<firstConfig> <secondConfig>")


program.parse(process.argv);

program.help();

#!/usr/bin/env node
import { version } from '../../package.json';

const program = require('commander');

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .version(version)
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);

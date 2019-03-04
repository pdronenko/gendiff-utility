#!/usr/bin/env node
import gendiff from 'gendiff-pdronenko'; // eslint-disable-line
import { version } from '../../package.json';

const program = require('commander');
const fs = require('fs');

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .version(version)
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    const fileCheck = (err, data) => (err ? console.error(err) : data);
    const parse = path => JSON.parse(fs.readFileSync(path, 'UTF-8', fileCheck));
    const firstConfigData = parse(firstConfig);
    const secondConfigData = parse(secondConfig);

    return gendiff(parse(firstConfigData, secondConfigData));
  });

program.parse(process.argv);

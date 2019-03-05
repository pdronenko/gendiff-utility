#!/usr/bin/env node
import gendiff from '..';
import { version } from '../../package.json';
import program from 'commander';

const fs = require('fs');
const path = require('path');

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .version(version)
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    const isExtnameJSON = p => path.extname(p).toLowerCase() === '.json';

    if (!isExtnameJSON(firstConfig)) {
      console.log(`${firstConfig} is not JSON file`);
      return;
    }
    if (!isExtnameJSON(secondConfig)) {
      console.log(`${secondConfig} is not JSON file`);
      return;
    }
    const pathProcess = (p) => {
      const fullPath = path.isAbsolute(p) ? p : `${process.cwd()}/${p}`;
      return path.normalize(fullPath);
    };

    const readDataFromFile = p => fs.readFileSync(p, 'UTF-8');
    const firstData = readDataFromFile(pathProcess(firstConfig));
    const secondData = readDataFromFile(pathProcess(secondConfig));
    console.log(gendiff(JSON.parse(firstData), JSON.parse(secondData)));
  });

program.parse(process.argv);

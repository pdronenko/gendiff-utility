#!/usr/bin/env node
import gendiff from '..';
import { version } from '../../package.json';
import program from 'commander';
import { canExtnameParse } from '../parsers';
import path from 'path';

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .version(version)
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    if (!canExtnameParse(path.extname(firstConfig))) {
      console.log(`${firstConfig} is not correct file format`);
      return;
    }
    if (!canExtnameParse(path.extname(secondConfig))) {
      console.log(`${secondConfig} is not correct file format`);
      return;
    }
    const pathProcess = (p) => {
      const fullPath = path.isAbsolute(p) ? p : `${process.cwd()}/${p}`;
      return path.normalize(fullPath);
    };

    const pathToFile1 = pathProcess(firstConfig);
    const pathToFile2 = pathProcess(secondConfig);
    console.log(gendiff(pathToFile1, pathToFile2));
  });

program.parse(process.argv);

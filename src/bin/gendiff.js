#!/usr/bin/env node
import gendiff from '..';
import { version } from '../../package.json';
import program from 'commander';
import path from 'path';

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .version(version)
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    const pathProcess = (pathToFile) => {
      const fullPath = path.isAbsolute(pathToFile) ? pathToFile : `${process.cwd()}/${pathToFile}`;
      return path.normalize(fullPath);
    };

    const pathToFile1 = pathProcess(firstConfig);
    const pathToFile2 = pathProcess(secondConfig);
    console.log(gendiff(pathToFile1, pathToFile2));
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

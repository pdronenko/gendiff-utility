import yaml from 'js-yaml';

const path = require('path');
const fs = require('fs');

const listOfFormats = [
  {
    extname: '.json',
    process: data => JSON.parse(data),
  },
  {
    extname: '.yml',
    process: data => yaml.safeLoad(data),
  },
];

export const readDataFromFile = pathToFile => fs.readFileSync(pathToFile, 'UTF-8');

export const parse = (pathToFile) => {
  const { process } = listOfFormats.find(({ extname }) => path.extname(pathToFile) === extname);
  return process(readDataFromFile(pathToFile));
};

export const canExtnameParse = (fileExtname) => {
  const searchResult = listOfFormats.find(({ extname }) => fileExtname === extname);
  return searchResult !== undefined;
};

/* eslint-disable */
import { has, union, flatten } from 'lodash';
import { parse } from './parsers';
import path from 'path';
import fs from 'fs';

const readDataFromFile = pathToFile => fs.readFileSync(pathToFile, 'UTF-8');

const signList = { noChange: ' ', deleted: '-', added: '+' };
const buildLine = (sign, key, value) => `  ${signList[sign]} ${key}: ${value}`;

export default (pathToFile1, pathToFile2) => {
  const beforeData = parse(readDataFromFile(pathToFile1), path.extname(pathToFile1));
  const afterData = parse(readDataFromFile(pathToFile2), path.extname(pathToFile2));
  const keys = union(Object.keys(beforeData), Object.keys(afterData));

  const diffActions = [
    {
      sign: 'noChange',
      check: (key) => has(beforeData, key) && beforeData[key] === afterData[key],
      process: (sign, key) => buildLine(sign, key, beforeData[key]),
    },
    {
      sign: 'deleted',
      check: (key) => has(beforeData, key) && !has(afterData, key),
      process: (sign, key) => buildLine(sign, key, beforeData[key]),
    },
    {
      sign: ['deleted', 'added'],
      check: (key) => has(beforeData, key) && beforeData[key] !== afterData[key],
      process: (sign, key) => {
        const deletedLine = buildLine(sign[0], key, beforeData[key]);
        const addedLine = buildLine(sign[1], key, afterData[key]);
        return [deletedLine, addedLine];
      },
    },
    {
      sign: 'added',
      check: (key) => !has(beforeData, key) && has(afterData, key),
      process: (sign, key) => buildLine(sign, key, afterData[key]),
    },
  ];

  const diffString = flatten(
    keys.map((key) => {
      const { sign, process } = diffActions.find(({ check }) => check(key));
      return process(sign, key);
    })
  ).join('\n');

  return `{\n${diffString}\n}`;
};

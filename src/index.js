/* eslint-disable */
import { has, zip, flatten } from 'lodash';
import { parse } from './parsers';

const buildLine = (key, value) => sign => `  ${sign} ${key}: ${value}`;

const linesConstructor = (beforeData, afterData) => (key) => {
  const prepareLine = buildLine(key, beforeData[key]);
  const diffActions = [
    {
      name: 'equal',
      check: beforeData[key] === afterData[key],
      process: () => prepareLine(' '),
    },
    {
      name: 'deleted',
      check: !has(afterData, key),
      process: () => prepareLine('-'),
    },
    {
      name: 'changed',
      check: has(afterData, key),
      process: () => {
        const deletedLine = prepareLine('-');
        const addedLine = buildLine(key, afterData[key])('+');
        return [deletedLine, addedLine];
      },
    },
  ];
  const { process } = diffActions.find(({ check }) => check);
  return process();
};

export default (pathToFile1, pathToFile2) => {
  const beforeData = parse(pathToFile1);
  const afterData = parse(pathToFile2);

  const preConstructor = linesConstructor(beforeData, afterData);
  const changedData = Object.keys(beforeData).map(key => preConstructor(key));
  const addedData = Object.keys(afterData)
    .filter(key => !has(beforeData, key))
    .map(key => buildLine(key, afterData[key])('+'));

  const diffString = flatten(changedData).concat(addedData).join('\n');
  return `{\n${diffString}\n}`;
};

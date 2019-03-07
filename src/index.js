/* eslint-disable */
import { has, union, flatten } from 'lodash';
import parse from './parsers';
import path from 'path';
import fs from 'fs';

const readDataFromFile = pathToFile => fs.readFileSync(pathToFile, 'UTF-8');

const buildAST = (beforeData, afterData) => {
  const astTree = [
    {
      status: 'noChange',
      value: (key) => beforeData[key],
      children: () => [],
      check: (key) => has(beforeData, key) && beforeData[key] === afterData[key],
    },
    {
      status: 'children',
      value: () => '',
      children: (key) => buildAST(beforeData[key], afterData[key]),
      check: (key) => beforeData[key] instanceof Object && afterData[key] instanceof Object,
    },
    {
      status: 'deleted',
      value: (key) => beforeData[key],
      children: () => [],
      check: (key) => has(beforeData, key) && !has(afterData, key),
    },
    {
      status: 'changed',
      value: (key) => [beforeData[key], afterData[key]],
      children: () => [],
      check: (key) => has(beforeData, key) && beforeData[key] !== afterData[key],
    },
    {
      status: 'added',
      value: (key) => afterData[key],
      children: () => [],
      check: (key) => !has(beforeData, key) && has(afterData, key),
    },
  ];

  const keys = union(Object.keys(beforeData), Object.keys(afterData));
  return keys.map((key) => {
    const { status, value, children } = astTree.find(({ check }) => check(key));
    return { name: key, status, value: value(key), children: children(key) };
  });
};

export default (pathToFile1, pathToFile2) => {
  const signList = { noChange: ' ', deleted: '-', added: '+' };
  const buildLine = (sign, key, value) => `  ${signList[sign]} ${key}: ${value}`;
  const beforeData = parse(readDataFromFile(pathToFile1), path.extname(pathToFile1));
  const afterData = parse(readDataFromFile(pathToFile2), path.extname(pathToFile2));

  return JSON.stringify(buildAST(beforeData, afterData));
};

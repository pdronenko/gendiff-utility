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
    return { key, status, value: value(key), children: children(key) };
  });
};

export default (pathToFile1, pathToFile2) => {
  const beforeData = parse(readDataFromFile(pathToFile1), path.extname(pathToFile1));
  const afterData = parse(readDataFromFile(pathToFile2), path.extname(pathToFile2));

  const stringify = (value, tab) => {
    if (typeof value === 'string') return value;
    const addTab = tab.repeat(2);
    const entriesString = Object.entries(value).map(([key, value]) => `${key}: ${value}`).join(`\n${addTab}`);
    return `{\n${addTab}${entriesString}\n${tab}}`;
  };

  const renderList = { 
    noChange: (key, value) => `    ${key}: ${JSON.stringify(value)}`, 
    changed: (key, value) => {
      const deletedLine = `  - ${key}: ${JSON.stringify(value[0])}`;
      const addedLine = `  + ${key}: ${JSON.stringify(value[1])}`;
      return [deletedLine, addedLine];
    }, 
    deleted: (key, value, tab) => `  - ${key}: ${stringify(value, '  '.repeat(2))}`,
    added: (key, value) => `  + ${key}: ${stringify(value, '  '.repeat(2))}`,
    children: () => 'children',
  };
  const render = (ast, tab = '') => {
    const mappedAst = flatten(ast.map(({ key, value, status, children }) => {
      return renderList[status](key, value, tab);
    }));
    return `{\n${mappedAst.join('\n')}\n}`;
  };
//  return buildAST(beforeData, afterData);
  return render(buildAST(beforeData, afterData));
};

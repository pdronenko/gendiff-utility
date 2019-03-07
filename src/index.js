import { has, union, flatten } from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const readDataFromFile = pathToFile => fs.readFileSync(pathToFile, 'UTF-8');

const buildAST = (beforeData, afterData) => {
  const astTree = [
    {
      status: 'noChange',
      value: key => beforeData[key],
      children: () => [],
      check: key => has(beforeData, key) && beforeData[key] === afterData[key],
    },
    {
      status: 'hasChildren',
      value: () => '',
      children: key => buildAST(beforeData[key], afterData[key]),
      check: key => beforeData[key] instanceof Object && afterData[key] instanceof Object,
    },
    {
      status: 'deleted',
      value: key => beforeData[key],
      children: () => [],
      check: key => has(beforeData, key) && !has(afterData, key),
    },
    {
      status: 'changed',
      value: key => [beforeData[key], afterData[key]],
      children: () => [],
      check: key => has(beforeData, key) && beforeData[key] !== afterData[key],
    },
    {
      status: 'added',
      value: key => afterData[key],
      children: () => [],
      check: key => !has(beforeData, key) && has(afterData, key),
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

  const signList = { noChange: ' ', deleted: '-', added: '+', hasChildren: ' ' };
  const buildLine = (status, key, value, spaceCount) => {
    const stringify = (data) => {
      if (typeof data !== 'object') return data;
      const newSpaceCount = spaceCount + 4;
      const entriesString = Object.entries(data)
        .map(([k, v]) => buildLine('noChange', k, v, newSpaceCount)).join('\n');
      return `{\n${entriesString}\n${' '.repeat(newSpaceCount)}}`;
    };

    if (status === 'changed') {
      const deletedLine = buildLine('deleted', key, value[0], spaceCount);
      const addedLine = buildLine('added', key, value[1], spaceCount);
      return [deletedLine, addedLine];
    }
    return `${' '.repeat(spaceCount)}  ${signList[status]} ${key}: ${stringify(value)}`;
  };

  const render = (astTree, spaceCount = 0) => {
    const resultString = flatten(astTree
      .map(({ key, value, status, children }) => {
        const newValue = status === 'hasChildren' ? render(children, spaceCount + 4) : value;
        return buildLine(status, key, newValue, spaceCount);
      }))
      .join('\n');
    return `{\n${resultString}\n${' '.repeat(spaceCount)}}`;
  };

  return render(buildAST(beforeData, afterData));
};
import { has, union } from 'lodash';

const buildASTdiff = (beforeData, afterData) => {
  const astTreeActions = [
    {
      type: 'unchanged',
      value: key => beforeData[key],
      children: () => [],
      check: key => has(beforeData, key) && beforeData[key] === afterData[key],
    },
    {
      type: 'nested',
      value: () => '',
      children: key => buildASTdiff(beforeData[key], afterData[key]),
      check: key => beforeData[key] instanceof Object && afterData[key] instanceof Object,
    },
    {
      type: 'deleted',
      value: key => beforeData[key],
      children: () => [],
      check: key => has(beforeData, key) && !has(afterData, key),
    },
    {
      type: 'changed',
      value: key => [beforeData[key], afterData[key]],
      children: () => [],
      check: key => has(beforeData, key) && beforeData[key] !== afterData[key],
    },
    {
      type: 'added',
      value: key => afterData[key],
      children: () => [],
      check: key => !has(beforeData, key) && has(afterData, key),
    },
  ];

  const keys = union(Object.keys(beforeData), Object.keys(afterData));
  return keys.map((key) => {
    const { type, value, children } = astTreeActions.find(({ check }) => check(key));
    return {
      key, type, value: value(key), children: children(key),
    };
  });
};

export default buildASTdiff;

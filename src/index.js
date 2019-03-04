/* eslint-disable */
import { has, zip } from 'lodash';

const lineBuilder = (sign, key, value) => `\n  ${sign} ${key}: ${value}`;

export default (beforeObj, afterObj) => {
  const lineBuilders = [
    {
      check: (key) => beforeObj[key] === afterObj[key],
      process: (key1, key2) => lineBuilder(' ', key1, beforeObj[key1]),
    },
    {
      check: (key) => !has(afterObj, key),
      process: (key1, key2) => lineBuilder('-', key1, beforeObj[key1]),
    },
    {
      check: () => true,
      process: (key1, key2) => {
        const addedLine = lineBuilder('+', key2, afterObj[key2]);
        const minusLine = lineBuilder('-', key1, beforeObj[key1]);
        const plusLine = lineBuilder('+', key1, afterObj[key1]);
        return `${plusLine}${minusLine}${addedLine}`;
      },
    },
  ];
  const getDiffAction = key => lineBuilders.find(({ check }) => check(key));

  const generateDiff = (str, [key1, key2]) => {
    const { process } = getDiffAction(key1);
    return `${str}${process(key1, key2)}`
  };
  const diffLines = zip(Object.keys(beforeObj), Object.keys(afterObj))
    .reduce(generateDiff, '');
  return `{${diffLines}\n}\n`;
};

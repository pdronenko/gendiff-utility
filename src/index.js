/* eslint-disable */
import { has, zip } from 'lodash';

const noChanges = '\n    ';
const plusLine = '\n  + ';
const minusLine = '\n  - ';

export default (beforeObj, afterObj) => {
  const afterKeys = Object.keys(afterObj);
  const beforeKeys = Object.keys(beforeObj);

  const generateDiff = (str, [key1, key2]) => {
    if (!has(afterObj, key1)) return `${str}${minusLine}${key1}: ${beforeObj[key1]}`;
    if (beforeObj[key1] === afterObj[key1]) return `${str}${noChanges}${key1}: ${beforeObj[key1]}`;
    const minus = `${minusLine}${key1}: ${beforeObj[key1]}`;
    const plus = `${plusLine}${key1}: ${afterObj[key1]}`;
    const newLine = has(beforeObj, key2) ? '' : `${plusLine}${key2}: ${afterObj[key2]}`;
    return `${str}${plus}${minus}${newLine}`;
  };

  const result = zip(beforeKeys, afterKeys).reduce(generateDiff, '');
  return `{${result}\n}\n`;
};

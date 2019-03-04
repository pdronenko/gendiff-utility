/* eslint-disable */
import { has } from 'lodash';

const noChanges = '\n    ';
const plusLine = '\n  + ';
const minusLine = '\n  - ';

export default (beforeObj, afterObj) => {
  const reduceFunc = (str, key) => {
    if (!has(afterObj, key)) return `${str}${minusLine}${key}: ${beforeObj[key]}`;
    if (beforeObj[key] === afterObj[key]) return `${str}${noChanges}${key}: ${beforeObj[key]}`;
    const minus = `${minusLine}${key}: ${beforeObj[key]}`;
    const plus = `${plusLine}${key}: ${afterObj[key]}`;
    return `${str}${plus}${minus}`;
  };
  const result = Object.keys(beforeObj).reduce(reduceFunc, '');
  return `{${result}\n}\n`;
};

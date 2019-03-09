import fs from 'fs';
import gendiff from '../src';

const pathToInitialBefore = '__tests__/__fixtures__/initial/before';
const pathToInitialAfter = '__tests__/__fixtures__/initial/after';
const extnameTable = [['.json'], ['.yml'], ['.ini']];

describe('gendiff', () => {
  const expectedJSONDiff = fs.readFileSync('__tests__/__fixtures__/expectedJSONResult', 'UTF-8');
  const expectedPlainDiff = fs.readFileSync('__tests__/__fixtures__/expectedPlainResult', 'UTF-8');

  test.each(extnameTable)('json test %s', (extname) => {
    const pathToBeforeFile = `${pathToInitialBefore}${extname}`;
    const pathToAfterFile = `${pathToInitialAfter}${extname}`;
    const receivedDiff = gendiff(pathToBeforeFile, pathToAfterFile, 'default');
    expect(receivedDiff).toBe(expectedJSONDiff);
  });

  test.each(extnameTable)('plain test %s', (extname) => {
    const pathToBeforeFile = `${pathToInitialBefore}${extname}`;
    const pathToAfterFile = `${pathToInitialAfter}${extname}`;
    const receivedDiff = gendiff(pathToBeforeFile, pathToAfterFile, 'plain');
    expect(receivedDiff).toBe(expectedPlainDiff);
  });
});

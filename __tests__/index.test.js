import fs from 'fs';
import gendiff from '../src';

const pathToInitialBefore = '__tests__/__fixtures__/initial/before';
const pathToInitialAfter = '__tests__/__fixtures__/initial/after';
const extnameTable = [['.json'], ['.yml'], ['.ini']];

describe('gendiff', () => {
  const expectedDefaultDiff = fs.readFileSync('__tests__/__fixtures__/expectedDefaultResult', 'UTF-8');
  const expectedPlainDiff = fs.readFileSync('__tests__/__fixtures__/expectedPlainResult', 'UTF-8');

  test.each(extnameTable)('json test %s', (extname) => {
    const pathToBeforeFile = `${pathToInitialBefore}${extname}`;
    const pathToAfterFile = `${pathToInitialAfter}${extname}`;
    const receivedDefaultDiff = gendiff(pathToBeforeFile, pathToAfterFile, 'default');
    const receivedPlainDiff = gendiff(pathToBeforeFile, pathToAfterFile, 'plain');
    expect(receivedDefaultDiff).toBe(expectedDefaultDiff);
    expect(receivedPlainDiff).toBe(expectedPlainDiff);
  });
});

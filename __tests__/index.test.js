import fs from 'fs';
import gendiff from '../src';

const pathToInitialBefore = '__tests__/__fixtures__/initial/before';
const pathToInitialAfter = '__tests__/__fixtures__/initial/after';
const extnameTable = [['.json'], ['.yml'], ['.ini']];

describe('gendiff', () => {
  const expectedDiff = fs.readFileSync('__tests__/__fixtures__/expectedResult', 'UTF-8');

  test.each(extnameTable)('test %s', (extname) => {
    const pathToBeforeFile = `${pathToInitialBefore}${extname}`;
    const pathToAfterFile = `${pathToInitialAfter}${extname}`;
    const receivedDiff = gendiff(pathToBeforeFile, pathToAfterFile);
    expect(receivedDiff).toBe(expectedDiff);
  });
});

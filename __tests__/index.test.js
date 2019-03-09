import fs from 'fs';
import gendiff from '../src';

const pathToInitialBefore = '__tests__/__fixtures__/initial/before';
const pathToInitialAfter = '__tests__/__fixtures__/initial/after';
const extnameTable = [['.json'], ['.yml'], ['.ini']];

describe('gendiff', () => {
  const expectedVisualDiff = fs.readFileSync('__tests__/__fixtures__/expectedVisualResult', 'UTF-8');
  const expectedPlainDiff = fs.readFileSync('__tests__/__fixtures__/expectedPlainResult', 'UTF-8');

  test.each(extnameTable)('visual and plain test %s', (extname) => {
    const pathToBeforeFile = `${pathToInitialBefore}${extname}`;
    const pathToAfterFile = `${pathToInitialAfter}${extname}`;
    const receivedVisualDiff = gendiff(pathToBeforeFile, pathToAfterFile, 'visual');
    const receivedPlainDiff = gendiff(pathToBeforeFile, pathToAfterFile, 'plain');
    expect(receivedVisualDiff).toBe(expectedVisualDiff);
    expect(receivedPlainDiff).toBe(expectedPlainDiff);
  });
});

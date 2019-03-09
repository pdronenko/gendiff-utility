import fs from 'fs';
import gendiff from '../src';

const pathToInitialBefore = '__tests__/__fixtures__/initial/before';
const pathToInitialAfter = '__tests__/__fixtures__/initial/after';
const extnameTable = [['visual', '.json'], ['plain', '.ini'], ['json', '.yml']];

describe('gendiff', () => {
  const expectedDiff = format => fs.readFileSync(`__tests__/__fixtures__/${format}ExpectedResult`, 'UTF-8');

  test.each(extnameTable)('%s format and %s file', (format, extname) => {
    const pathToBeforeFile = `${pathToInitialBefore}${extname}`;
    const pathToAfterFile = `${pathToInitialAfter}${extname}`;
    const receivedDiff = gendiff(pathToBeforeFile, pathToAfterFile, format);
    expect(receivedDiff).toBe(expectedDiff(format));
  });
});

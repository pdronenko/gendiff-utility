import fs from 'fs';
import gendiff from '../src';
import { formatsParseList } from '../src/parsers';

const expectedDiff = fs.readFileSync('__tests__/__fixtures__/expectedResult', 'UTF-8');
const pathToInitialBefore = '__tests__/__fixtures__/initial/before';
const pathToInitialAfter = '__tests__/__fixtures__/initial/after';
const extnameTable = formatsParseList.map(({ extname }) => [extname]);

describe('gendiff', () => {
  test.each(extnameTable)('test %s', (extname) => {
    const pathToBeforeFile = `${pathToInitialBefore}${extname}`;
    const pathToAfterFile = `${pathToInitialAfter}${extname}`;
    const receivedDiff = gendiff(pathToBeforeFile, pathToAfterFile);
    expect(receivedDiff).toBe(expectedDiff);
  });
});

import gendiff from '../src';
import { readDataFromFile } from '../src/parsers';

const fs = require('fs');

const expectedResultPath = '__tests__/__fixtures__/expectedResult';
const receivedResultPath = '__tests__/__fixtures__/receivedResult';
const getExpectedDiff = () => readDataFromFile(expectedResultPath, 'UTF-8');
const getReceivedDiff = () => readDataFromFile(receivedResultPath, 'UTF-8');

test('gendiff JSON test', () => {
  const writeResult = data => fs.writeFileSync(receivedResultPath, data, 'UTF-8');
  const pathToBeforeJSON = '__tests__/__fixtures__/initialJSON/before.json';
  const pathToAfterJSON = '__tests__/__fixtures__/initialJSON/after.json';
  writeResult(gendiff(pathToBeforeJSON, pathToAfterJSON));
  expect(getReceivedDiff()).toBe(getExpectedDiff());
});

test('gendiff YML test', () => {
  const writeResult = data => fs.writeFileSync(receivedResultPath, data, 'UTF-8');
  const pathToBeforeYAML = '__tests__/__fixtures__/initialYAML/before.yml';
  const pathToAfterYAML = '__tests__/__fixtures__/initialYAML/after.yml';
  writeResult(gendiff(pathToBeforeYAML, pathToAfterYAML));
  expect(getReceivedDiff()).toBe(getExpectedDiff());
});

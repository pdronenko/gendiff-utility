import fs from 'fs';
import gendiff from '../src';
import { readDataFromFile } from '../src/parsers';

const getExpectedDiff = () => readDataFromFile('__tests__/__fixtures__/expectedResult', 'UTF-8');
const getReceivedDiff = () => readDataFromFile('__tests__/__fixtures__/receivedResult', 'UTF-8');
const writeResult = data => fs.writeFileSync('__tests__/__fixtures__/receivedResult', data);

test('gendiff JSON test', () => {
  const pathToBeforeJSON = '__tests__/__fixtures__/initialJSON/before.json';
  const pathToAfterJSON = '__tests__/__fixtures__/initialJSON/after.json';
  writeResult(gendiff(pathToBeforeJSON, pathToAfterJSON));
  expect(getReceivedDiff()).toBe(getExpectedDiff());
});

test('gendiff YML test', () => {
  const pathToBeforeYAML = '__tests__/__fixtures__/initialYAML/before.yml';
  const pathToAfterYAML = '__tests__/__fixtures__/initialYAML/after.yml';
  writeResult(gendiff(pathToBeforeYAML, pathToAfterYAML));
  expect(getReceivedDiff()).toBe(getExpectedDiff());
});

test('gendiff INI test', () => {
  const pathToBeforeINI = '__tests__/__fixtures__/initialINI/before.ini';
  const pathToAfterINI = '__tests__/__fixtures__/initialINI/after.ini';
  writeResult(gendiff(pathToBeforeINI, pathToAfterINI));
  expect(getReceivedDiff()).toBe(getExpectedDiff());
});

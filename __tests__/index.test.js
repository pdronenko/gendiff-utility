import gendiff from '../src';

const fs = require('fs');

const fixturesPath = '__tests__/__fixtures__';

const expectedDiff = () => fs.readFileSync(`${fixturesPath}/expectedResult`, 'UTF-8');
const receivedDiff = () => fs.readFileSync(`${fixturesPath}/receivedResult`, 'UTF-8');

const writeResult = data => fs.writeFileSync(`${fixturesPath}/receivedResult`, data, 'UTF-8');
const parse = filename => JSON.parse(fs.readFileSync(`${fixturesPath}/initialJSON/${filename}`, 'UTF-8'));

test('gendiff test', () => {
  writeResult(gendiff(parse('before.json'), parse('after.json')));
  expect(receivedDiff()).toBe(expectedDiff());
});

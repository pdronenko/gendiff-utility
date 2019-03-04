import gendiff from '..';

const fs = require('fs');

const expectedResult = () => fs.readFileSync('src/__tests__/__fixtures__/expectedResult', 'UTF-8');
const writeResult = data => fs.writeFileSync('src/__tests__/__fixtures__/receivedResult', data, 'UTF-8');
const receivedResult = () => fs.readFileSync('src/__tests__/__fixtures__/receivedResult', 'UTF-8');
const parse = path => JSON.parse(fs.readFileSync(path, 'UTF-8'));

test('gendiff test', () => {
  const beforeJSON = () => parse('src/__tests__/__fixtures__/initialJSON/before.json');
  const afterJSON = () => parse('src/__tests__/__fixtures__/initialJSON/after.json');
  writeResult(gendiff(beforeJSON(), afterJSON()));
  expect(receivedResult()).toBe(expectedResult());
});

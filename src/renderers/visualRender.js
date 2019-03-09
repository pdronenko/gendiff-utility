import { flatten } from 'lodash';

const signList = {
  unchanged: ' ', deleted: '-', added: '+', nested: ' ',
};

const stringify = (data, spaceCount) => {
  if (typeof data !== 'object') return data;

  const newSpaceCount = spaceCount + 4;
  const entriesString = Object.entries(data)
    .map(([key, value]) => {
      const newValue = typeof value === 'object' ? stringify(value, newSpaceCount) : value;
      return `${' '.repeat(newSpaceCount)}    ${key}: ${newValue}`;
    }).join('\n');

  return `{\n${entriesString}\n${' '.repeat(newSpaceCount)}}`;
};

const buildLine = (type, key, value, spaceCount, delValue, addValue) => {
  if (type === 'changed') {
    const deletedLine = buildLine('deleted', key, delValue, spaceCount);
    const addedLine = buildLine('added', key, addValue, spaceCount);
    return [deletedLine, addedLine];
  }
  return `${' '.repeat(spaceCount)}  ${signList[type]} ${key}: ${stringify(value, spaceCount)}`;
};

const visualRender = (astDiff, spaceCount = 0) => {
  const resultString = astDiff
    .map((node) => {
      const {
        key, value, type, children, deletedValue, addedValue,
      } = node;
      const newValue = type === 'nested' ? visualRender(children, spaceCount + 4) : value;
      return buildLine(type, key, newValue, spaceCount, deletedValue, addedValue);
    });

  const joinedResult = flatten(resultString).join('\n');
  return `{\n${joinedResult}\n${' '.repeat(spaceCount)}}`;
};

export default visualRender;

import { flatten } from 'lodash';

const genSpaces = depth => ' '.repeat(depth * 4);

const stringify = (data, depth) => {
  if (typeof data !== 'object') return data;

  const entriesString = Object.entries(data)
    .map(([key, value]) => (`${genSpaces(depth)}    ${key}: ${value}`)).join('\n');

  return `{\n${entriesString}\n${genSpaces(depth)}}`;
};

const buildLine = sign => ({ depth, key, value }) => {
  const newValue = stringify(value, depth + 1);
  return `${genSpaces(depth)}  ${sign} ${key}: ${newValue}`;
};

const visualActions = {
    unchanged: buildLine(' '),
    added: buildLine('+'),
    deleted: buildLine('-'),
    nested: ({
      key, depth, visualRender, children,
    }) => {
      const newValue = visualRender(children, depth + 1);
      return `${genSpaces(depth)}    ${key}: ${newValue}`;
    },
    changed: ({ addedValue, deletedValue, ...rest }) => {
      const deletedLine = buildLine('-')({ value: deletedValue, ...rest });
      const addedLine = buildLine('+')({ value: addedValue, ...rest });
      return [deletedLine, addedLine];
    },
};

const visualRender = (astDiff, depth = 0) => {
  const resultString = astDiff
    .map(node => visualActions[node.type]({ visualRender, depth, ...node }));

  const joinedResult = flatten(resultString).join('\n');
  return `{\n${joinedResult}\n${genSpaces(depth)}}`;
};

export default visualRender;

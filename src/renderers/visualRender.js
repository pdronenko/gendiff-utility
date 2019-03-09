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

const visualActions = [
  {
    type: 'unchanged',
    build: buildLine(' '),
  },
  {
    type: 'added',
    build: buildLine('+'),
  },
  {
    type: 'deleted',
    build: buildLine('-'),
  },
  {
    type: 'nested',
    build: ({
      key, depth, visualRender, children,
    }) => {
      const newValue = visualRender(children, depth + 1);
      return `${genSpaces(depth)}    ${key}: ${newValue}`;
    },
  },
  {
    type: 'changed',
    build: ({ addedValue, deletedValue, ...rest }) => {
      const deletedLine = buildLine('-')({ value: deletedValue, ...rest });
      const addedLine = buildLine('+')({ value: addedValue, ...rest });
      return [deletedLine, addedLine];
    },
  },
];

const getVisualAction = nodeType => visualActions.find(({ type }) => nodeType === type);

const visualRender = (astDiff, depth = 0) => {
  const resultString = astDiff
    .map(({ type, ...rest }) => {
      const { build } = getVisualAction(type);
      return build({
        type, visualRender, depth, ...rest,
      });
    });

  const joinedResult = flatten(resultString).join('\n');
  return `{\n${joinedResult}\n${genSpaces(depth)}}`;
};

export default visualRender;

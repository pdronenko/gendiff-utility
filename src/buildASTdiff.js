import { has, union } from 'lodash';

const typeActionsList = [
  {
    type: 'unchanged',
    value: ({ key, bData }) => bData[key],
    process: ({ type, value, ...rest }) => ({ type, key: rest.key, value: value(rest) }),
    check: (key, bData, aData) => has(bData, key) && bData[key] === aData[key],
  },
  {
    type: 'nested',
    children: ({
      key, bData, aData, f,
    }) => f(bData[key], aData[key]),
    process: ({ type, children, ...rest }) => ({ type, key: rest.key, children: children(rest) }),
    check: (key, bData, aData) => bData[key] instanceof Object && aData[key] instanceof Object,
  },
  {
    type: 'deleted',
    value: ({ key, bData }) => bData[key],
    process: ({ type, value, ...rest }) => ({ type, key: rest.key, value: value(rest) }),
    check: (key, bData, aData) => has(bData, key) && !has(aData, key),
  },
  {
    type: 'changed',
    addedValue: ({ key, aData }) => aData[key],
    deletedValue: ({ key, bData }) => bData[key],
    process: ({
      type, addedValue, deletedValue, ...rest
    }) => ({
      type, key: rest.key, addedValue: addedValue(rest), deletedValue: deletedValue(rest),
    }),
    check: (key, bData, aData) => has(bData, key) && bData[key] !== aData[key],
  },
  {
    type: 'added',
    value: ({ key, aData }) => aData[key],
    process: ({ type, value, ...rest }) => ({ type, key: rest.key, value: value(rest) }),
    check: (key, bData, aData) => !has(bData, key) && has(aData, key),
  },
];

const getTypeActions = (key, bData, aData) => typeActionsList
  .find(({ check }) => check(key, bData, aData));

const buildASTdiff = (bData, aData) => {
  const keys = union(Object.keys(bData), Object.keys(aData));
  return keys.map((key) => {
    const { process, ...rest } = getTypeActions(key, bData, aData);
    return process({
      ...rest, f: buildASTdiff, key, bData, aData,
    });
  });
};

export default buildASTdiff;

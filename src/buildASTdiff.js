import { has, union } from 'lodash';

const typeActionsList = [
  {
    type: 'unchanged',
    value: ({ key, beforeData }) => beforeData[key],
    process: data => ({ type: data.type, key: data.key, value: data.value(data) }),
    check: (key, beforeData, afterData) => has(beforeData, key)
      && beforeData[key] === afterData[key],
  },
  {
    type: 'nested',
    children: ({
      key, beforeData, afterData, f,
    }) => f(beforeData[key], afterData[key]),
    process: data => ({ type: data.type, key: data.key, children: data.children(data) }),
    check: (key, beforeData, afterData) => beforeData[key] instanceof Object
      && afterData[key] instanceof Object,
  },
  {
    type: 'deleted',
    value: ({ key, beforeData }) => beforeData[key],
    process: data => ({ type: data.type, key: data.key, value: data.value(data) }),
    check: (key, beforeData, afterData) => has(beforeData, key) && !has(afterData, key),
  },
  {
    type: 'changed',
    addedValue: ({ key, afterData }) => afterData[key],
    deletedValue: ({ key, beforeData }) => beforeData[key],
    process: data => ({
      type: data.type,
      key: data.key,
      addedValue: data.addedValue(data),
      deletedValue: data.deletedValue(data),
    }),
    check: (key, beforeData, afterData) => has(beforeData, key)
      && beforeData[key] !== afterData[key],
  },
  {
    type: 'added',
    value: ({ key, afterData }) => afterData[key],
    process: data => ({ type: data.type, key: data.key, value: data.value(data) }),
    check: (key, beforeData, afterData) => !has(beforeData, key) && has(afterData, key),
  },
];

const getTypeActions = (key, beforeData, afterData) => typeActionsList
  .find(({ check }) => check(key, beforeData, afterData));

const buildASTdiff = (beforeData, afterData) => {
  const keys = union(Object.keys(beforeData), Object.keys(afterData));
  return keys.map((key) => {
    const actions = getTypeActions(key, beforeData, afterData);
    return actions.process({
      ...actions, f: buildASTdiff, key, beforeData, afterData,
    });
  });
};

export default buildASTdiff;

import { has, union } from 'lodash';

const typeActionsList = [
  {
    type: 'unchanged',
    process: data => ({ type: data.type, key: data.key, value: data.beforeData[data.key] }),
    check: (key, beforeData, afterData) => has(beforeData, key)
      && beforeData[key] === afterData[key],
  },
  {
    type: 'nested',
    process: ({
      type, key, beforeData, afterData, f,
    }) => ({ type, key, children: f(beforeData[key], afterData[key]) }),
    check: (key, beforeData, afterData) => beforeData[key] instanceof Object
      && afterData[key] instanceof Object,
  },
  {
    type: 'deleted',
    process: data => ({ type: data.type, key: data.key, value: data.beforeData[data.key] }),
    check: (key, beforeData, afterData) => has(beforeData, key) && !has(afterData, key),
  },
  {
    type: 'changed',
    process: data => ({
      type: data.type,
      key: data.key,
      addedValue: data.afterData[data.key],
      deletedValue: data.beforeData[data.key],
    }),
    check: (key, beforeData, afterData) => has(beforeData, key)
      && beforeData[key] !== afterData[key],
  },
  {
    type: 'added',
    process: data => ({ type: data.type, key: data.key, value: data.afterData[data.key] }),
    check: (key, beforeData, afterData) => !has(beforeData, key) && has(afterData, key),
  },
];

const getTypeActions = (key, beforeData, afterData) => typeActionsList
  .find(({ check }) => check(key, beforeData, afterData));

const buildASTdiff = (beforeData, afterData) => {
  const keys = union(Object.keys(beforeData), Object.keys(afterData));
  return keys.map((key) => {
    const { type, process } = getTypeActions(key, beforeData, afterData);
    return process({
      type, f: buildASTdiff, key, beforeData, afterData,
    });
  });
};

export default buildASTdiff;

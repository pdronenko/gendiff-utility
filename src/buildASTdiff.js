import { has, union, isObject } from 'lodash';

const typeActionsList = [
  {
    type: 'unchanged',
    process: value => ({ value }),
    check: (key, obj1, obj2) => has(obj1, key) && obj1[key] === obj2[key],
  },
  {
    type: 'deleted',
    process: value => ({ value }),
    check: (key, obj1, obj2) => has(obj1, key) && !has(obj2, key),
  },
  {
    type: 'added',
    process: (value1, value2) => ({ value: value2 }),
    check: (key, obj1, obj2) => !has(obj1, key) && has(obj2, key),
  },
  {
    type: 'nested',
    process: (value1, value2, f) => ({ children: f(value1, value2) }),
    check: (key, obj1, obj2) => isObject(obj1[key]) && isObject(obj2[key]),
  },
  {
    type: 'changed',
    process: (value1, value2) => ({ addedValue: value2, deletedValue: value1 }),
    check: (key, obj1, obj2) => has(obj1, key) && obj1[key] !== obj2[key],
  },
];

const getTypeActions = (key, obj1, obj2) => typeActionsList
  .find(({ check }) => check(key, obj1, obj2));

const buildASTdiff = (obj1, obj2) => {
  const keys = union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
    const { type, process } = getTypeActions(key, obj1, obj2);
    return { type, key, ...process(obj1[key], obj2[key], buildASTdiff) };
  });
};

export default buildASTdiff;

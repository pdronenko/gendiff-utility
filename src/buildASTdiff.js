import { has, union } from 'lodash';

const astTypeActions = [
  {
    type: 'unchanged',
    value: (key, bData) => bData[key],
    children: () => [],
    check: (key, bData, aData) => has(bData, key) && bData[key] === aData[key],
  },
  {
    type: 'nested',
    value: () => '',
    children: (key, bData, aData, f) => f(bData[key], aData[key]),
    check: (key, bData, aData) => bData[key] instanceof Object && aData[key] instanceof Object,
  },
  {
    type: 'deleted',
    value: (key, bData) => bData[key],
    children: () => [],
    check: (key, bData, aData) => has(bData, key) && !has(aData, key),
  },
  {
    type: 'changed',
    addValue: (key, bData, aData) => aData[key],
    delValue: (key, bData) => bData[key],
    children: () => [],
    check: (key, bData, aData) => has(bData, key) && bData[key] !== aData[key],
  },
  {
    type: 'added',
    value: (key, bData, aData) => aData[key],
    children: () => [],
    check: (key, bData, aData) => !has(bData, key) && has(aData, key),
  },
];

const getTypeAction = (key, bData, aData) => astTypeActions
  .find(({ check }) => check(key, bData, aData));

const buildASTdiff = (bData, aData) => {
  const preBuild = (f, key, fChild) => f(key, bData, aData, fChild);

  const keys = union(Object.keys(bData), Object.keys(aData));
  return keys.map((key) => {
    const {
      type, addValue, delValue, value, children,
    } = preBuild(getTypeAction, key);
    if (type === 'changed') {
      return {
        key,
        type,
        delValue: preBuild(delValue, key),
        addValue: preBuild(addValue, key),
        children: preBuild(children, key, buildASTdiff),
      };
    }
    return {
      key,
      type,
      value: preBuild(value, key),
      children: preBuild(children, key, buildASTdiff),
    };
  });
};

export default buildASTdiff;

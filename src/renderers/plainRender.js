import { flatten } from 'lodash';

const stringify = data => typeof data !== 'object' ? data : '[complex value]';

const signList = {
  changed: (v, delValue, addValue) => `was updated. From ${delValue} to ${addValue}`,
  added: (value) => `was added with value: ${value}`,
  deleted: () => 'was removed',
  nested: () => 'was nested',
};

const buildLine = (type, key, value, delValue, addValue) => {
    return `Property '${key}' ${signList[type](stringify(value), stringify(delValue), stringify(addValue))}`;
};


const plainRender = (ast, path = '') => {
  return ast.map((node) => {
    const {
      key, value, type, children, delValue, addValue,
    } = node;
    if (type === 'unchanged') return null;
    if (type === 'nested') {
      return plainRender(children, `${path}${path === '' ? '' : '.'}${key}`);
    }
    return buildLine(type, `${path}.${key}`, value, delValue, addValue);
  }).filter(n => n !== null).join('\n');
};

export default plainRender;

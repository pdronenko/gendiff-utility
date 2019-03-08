const stringify = data => (typeof data !== 'object' ? data : '[complex value]');

const signList = {
  changed: (v, delValue, addValue) => `was updated. From ${stringify(delValue)} to ${stringify(addValue)}`,
  added: value => `was added with value: ${stringify(value)}`,
  deleted: () => 'was removed',
  nested: () => 'was nested',
};

const buildLine = (type, key, value, delValue, addValue) => `Property '${key}' ${signList[type](value, delValue, addValue)}`;

const plainRender = (ast, path = '') => ast
  .map((node) => {
    const {
      key, value, type, children, delValue, addValue,
    } = node;
    const dot = path === '' ? '' : '.';
    if (type === 'unchanged') return null;
    if (type === 'nested') {
      return plainRender(children, `${path}${dot}${key}`);
    }
    return buildLine(type, `${path}${dot}${key}`, value, delValue, addValue);
  }).filter(n => n !== null).join('\n');

export default plainRender;

const stringify = data => (typeof data !== 'object' ? data : '[complex value]');

const typeList = {
  changed: (v, deletedValue, addedValue) => `was updated. From ${stringify(deletedValue)} to ${stringify(addedValue)}`,
  added: value => `was added with value: ${stringify(value)}`,
  deleted: () => 'was removed',
  nested: () => 'was nested',
};

const buildLine = (type, key, value, deletedValue, addedValue) => {
  if (type === 'unchanged') return null;
  const diffStr = typeList[type](value, deletedValue, addedValue);
  return `Property '${key}' ${diffStr}`;
};

const plainRender = (ast, path = '') => {
  const dot = path === '' ? '' : '.';

  const mappedResult = ast.map(({
    key, value, type, children, deletedValue, addedValue,
  }) => {
    const newPath = `${path}${dot}${key}`;
    if (type === 'nested') {
      return plainRender(children, newPath);
    }
    return buildLine(type, newPath, value, deletedValue, addedValue);
  });
  return mappedResult.filter(n => n !== null).join('\n');
};

export default plainRender;

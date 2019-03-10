const stringify = data => (typeof data !== 'object' ? data : '[complex value]');

const typeList = {
  unchanged: () => null,
  nested: ({ plainRender, children, pathToKey }) => plainRender(children, pathToKey),
  changed: ({ pathToKey, deletedValue, addedValue }) => {
    const fromToStr = `From ${stringify(deletedValue)} to ${stringify(addedValue)}`;
    return `Property '${pathToKey}' was updated. ${fromToStr}`;
  },
  added: ({ pathToKey, value }) => `Property '${pathToKey}' was added with value: ${stringify(value)}`,
  deleted: ({ pathToKey }) => `Property '${pathToKey}' was removed`,
};

const plainRender = (ast, path = '') => {
  const dot = path === '' ? '' : '.';

  const mappedResult = ast.map((node) => {
    const pathToKey = `${path}${dot}${node.key}`;
    return typeList[node.type]({ pathToKey, plainRender, ...node });
  });
  return mappedResult.filter(str => str !== null).join('\n');
};

export default plainRender;

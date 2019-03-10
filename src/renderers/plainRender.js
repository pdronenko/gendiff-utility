const stringify = data => (typeof data !== 'object' ? data : '[complex value]');

const plainActions = {
  unchanged: () => null,
  nested: ({ plainRender, children, path }) => plainRender(children, `${path}.`),
  changed: ({ path, deletedValue, addedValue }) => {
    const fromToStr = `From ${stringify(deletedValue)} to ${stringify(addedValue)}`;
    return `Property '${path}' was updated. ${fromToStr}`;
  },
  added: ({ path, value }) => `Property '${path}' was added with value: ${stringify(value)}`,
  deleted: ({ path }) => `Property '${path}' was removed`,
};

const plainRender = (ast, path = '') => {
  const mappedResult = ast
    .map(node => plainActions[node.type]({ path: `${path}${node.key}`, plainRender, ...node }));
  return mappedResult.filter(str => str !== null).join('\n');
};

export default plainRender;

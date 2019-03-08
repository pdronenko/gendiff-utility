import { has } from 'lodash';
import jsonRender from './jsonRender';
import plainRender from './plainRender';

export default (astDiff, format) => {
  const formatsActions = { json: jsonRender, plain: plainRender };
  if (!has(formatsActions, format)) {
    throw new Error(`${format} is not correct diff format. Only 'plain' or 'json' allowed.`);
  }
  return formatsActions[format](astDiff);
};

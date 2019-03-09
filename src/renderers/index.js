import { has } from 'lodash';
import visualRender from './visualRender';
import plainRender from './plainRender';
import jsonRender from './jsonRender';

export default (astDiff, format) => {
  const formatsActions = { visual: visualRender, plain: plainRender, json: jsonRender };
  if (!has(formatsActions, format)) {
    throw new Error(`${format} is not correct diff format. Only plain/json/visual allowed.`);
  }
  return formatsActions[format](astDiff);
};

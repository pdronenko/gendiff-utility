import yaml from 'js-yaml';
import ini from 'ini';
import { has } from 'lodash';

const formatsParseList = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (data, fileExtname) => {
  if (!has(formatsParseList, fileExtname)) {
    throw new Error(`${fileExtname} is not correct file format`);
  }

  return formatsParseList[fileExtname](data);
};

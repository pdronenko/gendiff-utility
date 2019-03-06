import yaml from 'js-yaml';
import ini from 'ini';
import { has } from 'lodash';

const formatsParseList = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export const parse = (data, fileExtname) => formatsParseList[fileExtname](data);

export const canExtnameParse = fileExtname => has(formatsParseList, fileExtname);

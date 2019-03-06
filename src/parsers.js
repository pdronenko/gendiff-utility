import yaml from 'js-yaml';
import ini from 'ini';

export const formatsParseList = [
  {
    extname: '.json',
    process: data => JSON.parse(data),
  },
  {
    extname: '.yml',
    process: data => yaml.safeLoad(data),
  },
  {
    extname: '.ini',
    process: data => ini.parse(data),
  },
];

export const parse = (data, fileExtname) => {
  const { process } = formatsParseList.find(({ extname }) => fileExtname === extname);
  return process(data);
};

export const canExtnameParse = (fileExtname) => {
  const searchResult = formatsParseList.find(({ extname }) => fileExtname === extname);
  return searchResult !== undefined;
};

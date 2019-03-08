import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './renderers';
import buildASTdiff from './buildASTdiff';

const readDataFromFile = pathToFile => fs.readFileSync(pathToFile, 'UTF-8');

export default (pathToFile1, pathToFile2, format = 'json') => {
  const beforeData = parse(readDataFromFile(pathToFile1), path.extname(pathToFile1));
  const afterData = parse(readDataFromFile(pathToFile2), path.extname(pathToFile2));
  const astDiff = buildASTdiff(beforeData, afterData);

  return render(astDiff, format);
};
